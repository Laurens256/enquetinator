import express from 'express';
import {
	validateEnqueteData,
	FormEnqueteData
} from '../utils/formData/validateEnqueteData';
import {
	globalEnqueteData,
	saveSubjectData,
	globalChosenSemester
} from '../utils/formData/saveFormData';

import { FormFields } from '../types';

const router = express.Router();

// meest messy function ooit, sorry als je hier ooit wat mee moet
// check the radio button that matches the value of the form data
const setDefaultValues = (subject: string) => {
	const savedData = globalEnqueteData[subject];

	for (const [key, obj] of Object.entries(formFields)) {
		// check if the object is a radio button
		if (obj.type === 'radio') {
			if (key === 'semester') {
				// check if the semester has been saved
				if (!Number.isNaN(globalChosenSemester)) {
					// check if subject semester has been saved, otherwise fallback to global semester
					if (globalEnqueteData[subject]) {
						obj.options.forEach((option) => {
							if (option.value !== String(globalEnqueteData[subject].semester)) {
								option.checked = false;
							} else {
								option.checked = true;
							}
						});
					} else {
						obj.options.forEach((option) => {
							if (option.value !== String(globalChosenSemester)) {
								option.checked = false;
							} else {
								option.checked = true;
							}
						});
					}
				}
				continue;
			}

			// check if the subject has data saved
			if (savedData && savedData[key as keyof typeof savedData]) {
				const savedValue = String(savedData[key as keyof typeof savedData]);

				// check if the saved value matches one of the options
				obj.options.forEach((option) => {
					if (option.value !== savedValue) {
						option.checked = false;
					} else {
						option.checked = true;
					}
				});
			} else {
				// if no data is saved, make sure all options are unchecked
				obj.options.forEach((option) => {
					option.checked = false;
				});
			}
		} else if (obj.type === 'checkbox') {
			if ('options' in formFields.teachers) {
				formFields.teachers.options = chooseTeachers();

				if (savedData && savedData[key as keyof typeof savedData]) {
					formFields.teachers.options.forEach((option) => {
						if (savedData.teachers.includes(option.value)) {
							option.checked = true;
						} else {
							option.checked = false;
						}
					});
				}
			}
		} else if (obj.type === 'submit') {
			if ('value' in formFields.submit) {
				if (subject === subjectInfo[subjectInfo.length - 1].subject) {
					formFields.submit.value = 'Naar overzicht';
				} else {
					formFields.submit.value = 'Volgende';
				}
			}
		}
	}
};

router.post('/', (req, res) => {
	const formData: FormEnqueteData = req.body;

	const { saveableData, errors } = validateEnqueteData(formData);

	// If there are no errors, save the data and redirect to next subject
	if (saveableData) {
		saveSubjectData(saveableData);
		const { nextUri } = getAdjacentUri(req.baseUrl, 'next');
		return res.redirect(nextUri);
	} else {
		for (const [key, message] of Object.entries(errors)) {
			if (formFields[key] && 'error' in formFields[key]) {
				formFields[key].error = message;
			}
		}
		res.redirect('back');
	}
});

const getAdjacentUri = (
	baseUrl: string,
	direction: 'prev' | 'next' | 'both' = 'both'
) => {
	let adjacent: { prevUri?: any, nextUri?: any } = {};
	if (direction === 'prev' || direction === 'both') {
		const prevSubject = subjectInfo[subjectInfo.indexOf(currentSubject) - 1];
		if (prevSubject) {
			adjacent.prevUri = `${baseUrl}?vak=${prevSubject.subject}`;
		}
	}
	if (direction === 'next' || direction === 'both') {
		const nextSubject = subjectInfo[subjectInfo.indexOf(currentSubject) + 1];
		if (nextSubject) {
			adjacent.nextUri = `${baseUrl}?vak=${nextSubject.subject}`;
		}
	}
	return adjacent;
};

router.get('/', (req, res) => {
	// Check if subject is valid and redirect if not
	let subject = req.query.vak;
	if (
		!(
			typeof subject === 'string' &&
			subjectInfo.find((subjectInfo) => subjectInfo.subject === subject)
		)
	) {
		subject = subjectInfo[0].subject;
		return res.redirect(`${req.baseUrl}?vak=${subject}`);
	}

	if (formFields.subject.type === 'hidden') {
		formFields.subject.value = subject;
	}

	currentSubject = subjectInfo.find((subjectInfo) => subjectInfo.subject === subject)!;

	setDefaultValues(subject);

	const { nextUri } = getAdjacentUri(req.baseUrl, 'next');

	res.render('enquete', {
		...res.locals,
		formFields,
		subjectInfo,
		nextUri: nextUri
	});
});

export default router;
export { getAdjacentUri };

// function for generating the options for the radio buttons, takes in the name for input id and the number of options, defaults to 10.
const generateRadioOptions = (name: string, n = 10) => {
	const options = [];
	for (let i = 1; i <= n; i++) {
		options.push({ label: `${i}`, value: `${i}`, id: `${name}-${i}` });
	}
	return options;
};

// function for generating the options for teachers checkboxes
const chooseTeachers = () => {
	const options: { label: string; value: string; id: string }[] = [];
	if (currentSubject) {
		currentSubject.teachers.forEach((teacher) => {
			options.push({
				label: `${teacher}`,
				value: `${teacher}`,
				id: `${teacher.toLowerCase()}`
			});
		});
	} else {
		teachers.forEach((teacher) => {
			options.push({
				label: `${teacher}`,
				value: `${teacher}`,
				id: `${teacher.toLowerCase()}`
			});
		});
	}
	return options;
};

const teachers = [
	'Sanne',
	'Vasilis',
	'Robert',
	'Peter-Paul Koch',
	'Janno',
	'Declan',
	'Justus',
	'Koop',
	'Joost'
];
const subjectInfo = [
	{ subject: 'css-to-the-rescue', teachers: ['Sanne', 'Vasilis'] },
	{ subject: 'web-app-from-scratch', teachers: ['Robert', 'Joost'] },
	{ subject: 'browser-technologies', teachers: ['Vasilis', 'Peter-Paul Koch'] },
	{ subject: 'progressive-web-apps', teachers: ['Janno', 'Declan'] },
	{ subject: 'realtime-web', teachers: teachers },
	{ subject: 'human-centered-design', teachers: teachers },
	{ subject: 'meesterproef', teachers: ['Justus', 'Sanne', 'Joost', 'Vasisilis', 'Koop'] }
];

let currentSubject = subjectInfo[0];

const formFields: FormFields = {
	subject: {
		type: 'hidden',
		value: ''
	},
	semester: {
		type: 'radio',
		classes: ['underline'],
		label: `In welk semester heb je dit vak gevolgd?`,
		required: true,
		error: '',
		options: generateRadioOptions('semester', 2)
	},
	teachers: {
		type: 'checkbox',
		classes: ['underline'],
		label: `Van welke docent(en) heb je dit vak gekregen?`,
		required: true,
		error: '',
		options: []
	},
	overall_rating: {
		type: 'radio',
		classes: ['underline'],
		label:
			'Hoe zou je dit vak in het algemeen beoordelen? <br>0 = zeer slecht, 10 = zeer goed.',
		required: true,
		error: '',
		options: generateRadioOptions('overall')
	},
	difficulty_rating: {
		type: 'radio',
		classes: ['underline'],
		label: 'Hoe moeilijk vond je dit vak? <br>0 = te makkelijk, 10 = te moeilijk.',
		required: true,
		error: '',
		options: generateRadioOptions('difficulty')
	},
	explanation_rating: {
		type: 'radio',
		classes: ['underline'],
		label:
			'Hoe duidelijk vond je de uitleg van dit vak? <br>0 = niet duidelijk, 10 = zeer duidelijk.',
		required: true,
		error: '',
		options: generateRadioOptions('explanation')
	},
	understanding_rating: {
		type: 'radio',
		classes: ['underline'],
		label: 'Hoe goed begreep je dit vak? <br>0 = niet goed, 10 = zeer goed.',
		required: true,
		error: '',
		options: generateRadioOptions('understanding')
	},
	submit: {
		type: 'submit',
		value: '',
		classes: ['underline'],
		resetable: true
	}
};
