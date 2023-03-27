import express from 'express';
import {
	validateEnqueteData,
	FormEnqueteData
} from '../utils/formData/handleEnqueteData';
import { globalEnqueteData } from '../utils/formData/saveFormData';
const router = express.Router();

const subjectsUri = [
	'css-to-the-rescue',
	'web-app-from-scratch',
	'project-1',
	'browser-technologies',
	'progressive-web-app'
];

const formFields = {
	subject: {
		textField: true,
		type: 'text',
		label: 'Vak',
		autocomplete: 'off',
		required: true,
		readonly: true,
		value: '',
		error: ''
	},

	semester: {
		radioButton: true,
		type: 'radio',
		label: 'In welk semester heb je dit vak gevolgd?',
		required: true,
		error: '',
		options: [
			{ label: '1', value: '1', id: 'semester-1', checked: false },
			{ label: '2', value: '2', id: 'semester-2', checked: false },
			{ label: '3', value: '3', id: 'semester-3', checked: false },
			{ label: '4', value: '4', id: 'semester-4', checked: false },
			{ label: '5', value: '5', id: 'semester-5', checked: false },
			{ label: '6', value: '6', id: 'semester-6', checked: false },
			{ label: '7', value: '7', id: 'semester-7', checked: false },
			{ label: '8', value: '8', id: 'semester-8', checked: false },
			{ label: '9', value: '9', id: 'semester-9', checked: false },
			{ label: '10', value: '10', id: 'semester-10', checked: false }
		]
	}
};

router.post('/', (req, res) => {
	const formData: FormEnqueteData = req.body;

	res.send('ok');
});

router.get('/', (req, res) => {
	let subject = req.query.vak;
	if (
		!(typeof subject === 'string' && subjectsUri.includes(subject)) ||
		typeof subject !== 'string'
	) {
		subject = subjectsUri[0];
		res.redirect(`${req.baseUrl}?vak=${subject}`);
	}

	formFields.subject.value = subject;

	res.render('enquete', {
		css: ['enquete', 'partials/inputs/text', 'partials/inputs/radio'],
		formFields
	});
});

export default router;
