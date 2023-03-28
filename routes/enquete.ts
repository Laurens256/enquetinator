import express from 'express';
import {
	validateEnqueteData,
	FormEnqueteData
} from '../utils/formData/validateEnqueteData';
import { globalEnqueteData, saveSubjectData } from '../utils/formData/saveFormData';

import { FormFields } from '../types';

const router = express.Router();

const css = ['enquete', 'partials/inputs/text', 'partials/inputs/radio'];

const subjectsUri = [
	'css-to-the-rescue',
	'web-app-from-scratch',
	'project-1',
	'browser-technologies',
	'progressive-web-app'
];

const formFields: FormFields = {
	subject: {
		type: 'text',
		label: 'Vak',
		autocomplete: 'off',
		required: true,
		readonly: true,
		value: '',
		error: ''
	},

	semester: {
		type: 'radio',
		label: 'In welk semester heb je dit vak gevolgd?',
		required: true,
		error: '',
		options: [
			{ label: '1', value: '1', id: 'semester-1' },
			{ label: '2', value: '2', id: 'semester-2' },
		]
	},
	overall_rating: {
		type: 'radio',
		label: 'In welk semester heb je dit vak gevolgd?',
		required: true,
		error: '',
		options: [
			{ label: '1', value: '1', id: 'semester-1' },
			{ label: '2', value: '2', id: 'semester-2' },
		]
	},
};

// check the radio button that matches the value of the form data
const setDefaultValues = (subject: string) => {
	for (const [key, obj] of Object.entries(formFields)) {
		// check if the object is a radio button
		if (obj.type === 'radio') {
			// if ('radioButton' in obj) {
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
			}
		}
	}
};

router.post('/', (req, res) => {
	const formData: FormEnqueteData = req.body;

	const saveableData = validateEnqueteData(formData);

	saveSubjectData(saveableData);

	// Redirect to next subject
	const nextSubject = subjectsUri[subjectsUri.indexOf(formData.subject) + 1];
	if (nextSubject) {
		res.redirect(`${req.baseUrl}?vak=${nextSubject}`);
	} else {
		res.redirect(`${req.baseUrl}?vak=${subjectsUri[0]}`);
		// res.redirect(`${req.baseUrl}/overview`);
	}
});

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

	if (formFields.subject.type === 'text') {
		formFields.subject.value = subject;
	}

	setDefaultValues(subject);

	res.render('enquete', {
		css: css,
		formFields
	});
});

export default router;
