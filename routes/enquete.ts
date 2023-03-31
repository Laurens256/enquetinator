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

const subjectsUri = [
	'css-to-the-rescue',
	'web-app-from-scratch',
	'browser-technologies',
	'progressive-web-app',
	'realtime-web',
	'human-centered-design',
	'meesterproef'
];

// check the radio button that matches the value of the form data
const setDefaultValues = (subject: string) => {
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
			const savedData = globalEnqueteData[subject];
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
		} else if (obj.type === 'submit') {
			if ('value' in formFields.submit) {
				if (subject === subjectsUri[subjectsUri.length - 1]) {
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

	const saveableData = validateEnqueteData(formData);

	saveSubjectData(saveableData);

	res.redirect(getNextUri(formData.subject, req.baseUrl));
});

const getNextUri = (subject: string, baseUrl: string) => {
	// Redirect to next subject or overview
	const nextSubject = subjectsUri[subjectsUri.indexOf(subject) + 1];
	if (nextSubject) {
		return `${baseUrl}?vak=${nextSubject}`;
	} else {
		return `${baseUrl}?vak=${subjectsUri[0]}`;
		// return`${baseUrl}/overview`;
	}
};

router.get('/', (req, res) => {
	// Check if subject is valid and redirect if not
	let subject = req.query.vak;
	if (
		!(typeof subject === 'string' && subjectsUri.includes(subject)) ||
		typeof subject !== 'string'
	) {
		subject = subjectsUri[0];
		return res.redirect(`${req.baseUrl}?vak=${subject}`);
	}

	if (formFields.subject.type === 'hidden') {
		formFields.subject.value = subject;
	}

	setDefaultValues(subject);

	res.render('enquete', {
		...res.locals,
		formFields,
		nextUri: getNextUri(subject, req.baseUrl)
	});
});

export default router;
export { getNextUri };

// function for generating the options for the radio buttons, takes in the name for input id and the number of options, defaults to 10.
const generateRadioOptions = (name: string, n = 10) => {
	const options = [];
	for (let i = 1; i <= n; i++) {
		options.push({ label: `${i}`, value: `${i}`, id: `${name}-${i}` });
	}
	return options;
};

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
