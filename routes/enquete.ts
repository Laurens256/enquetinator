import express from 'express';
import {
	validateEnqueteData,
	FormEnqueteData
} from '../utils/formData/validateEnqueteData';
import { saveSubjectData } from '../utils/formData/saveFormData';

import { setSemester, setRating } from '../utils/setEnqueteData/radio';
import { setTeachers } from '../utils/setEnqueteData/checkbox';
import { setSubject } from '../utils/setEnqueteData/text';

import { FormFields, TempEnqueteData } from '../types';
import { setSubmitValue } from '../utils/setEnqueteData/other';
import { transformTempData } from '../utils/setEnqueteData/transFormTempData';

const router = express.Router();

// check the radio button that matches the value of the form data
const setDefaultValues = (subject: string, tempData?: TempEnqueteData) => {
	for (const [key, obj] of Object.entries(formFields)) {
		switch (obj.type) {
			case 'hidden':
				setSubject(subject, obj);
				break;

			case 'radio':
				if (key === 'semester') {
					setSemester(subject, obj, tempData);
				} else {
					setRating(subject, key, obj, tempData);
				}
				break;

			case 'checkbox':
				setTeachers(currentSubject, obj, tempData);
				break;

			case 'submit':
				const isLast = subject === subjectInfo[subjectInfo.length - 1].subject;
				setSubmitValue(isLast, obj);
				break;
		}
	}
};

const getAdjacentUri = (
	baseUrl: string,
	direction: 'prev' | 'next' | 'both' = 'both'
) => {
	let adjacent: { prevUri?: string; nextUri?: string } = {};
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
		} else {
			adjacent.nextUri = `${baseUrl}/overview`;
		}
	}
	return adjacent;
};

let tempData: TempEnqueteData | undefined;
router.post('/', (req, res) => {
	const formData: FormEnqueteData = req.body;

	const { saveableData, errors } = validateEnqueteData(formData);

	// If there are no errors, save the data and redirect to next subject
	if (saveableData) {
		saveSubjectData(saveableData);

		const { nextUri } = getAdjacentUri(req.baseUrl, 'next');
		return res.redirect(nextUri!);
	} else {
		for (const [key, message] of Object.entries(errors)) {
			if (formFields[key] && 'error' in formFields[key]) {
				formFields[key].error = message;
			}
		}
		tempData = transformTempData(formData);
		res.redirect(`${req.baseUrl}?vak=${formData.subject}`);
	}
});

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

	currentSubject = subjectInfo.find((subjectInfo) => subjectInfo.subject === subject)!;

	setDefaultValues(subject, tempData);
	tempData = undefined;

	const progress = Math.round(
		(subjectInfo.indexOf(currentSubject) / subjectInfo.length) * 100
	);

	res.render('enquete', {
		...res.locals,
		formFields,
		subjectInfo,
		adjacentUri: getAdjacentUri(req.baseUrl),
		progress
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

const subjectInfo = [
	{ subject: 'css-to-the-rescue', teachers: ['Sanne', 'Vasilis'] },
	{ subject: 'web-app-from-scratch', teachers: ['Robert', 'Joost'] },
	{ subject: 'browser-technologies', teachers: ['Vasilis', 'Peter-Paul Koch'] },
	{ subject: 'progressive-web-apps', teachers: ['Janno', 'Declan'] },
	{ subject: 'realtime-web', teachers: [] },
	{ subject: 'human-centered-design', teachers: [] },
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
