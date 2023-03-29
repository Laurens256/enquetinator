import express from 'express';
import { validateUserData } from '../utils/formData/validateUserData';
import { saveUserData } from '../utils/formData/saveFormData';

import { FormFields, FormUserData, FormUserErrors } from '../types';

const router = express.Router();

const css = ['home', 'partials/inputs/text'];

const formFields: FormFields = {
	name: {
		type: 'text',
		label: 'Naam',
		autocomplete: 'name',
		required: true,
		value: 'a',
		error: ''
	},
	studentnumber: {
		type: 'number',
		label: 'Studentnummer',
		autocomplete: 'off',
		required: true,
		value: '123456789',
		error: ''
	},
	email: {
		type: 'email',
		label: 'Email',
		autocomplete: 'email',
		required: true,
		value: 'ddsfs@gsdfd.co',
		error: ''
	},
	submit: {
		type: 'submit',
		value: 'Verstuur'
	}
};

// set default values for the form fields
const setInputValues = (formData: FormUserData) => {
	for (const [key, obj] of Object.entries(formFields)) {
		if ('value' in obj && key !== 'submit') {
			obj.value = formData[key as keyof FormUserData];
		}
	}
};

// set errors for the form fields
const setInputErrors = (errors: FormUserErrors) => {
	for (const [key, obj] of Object.entries(formFields)) {
		if ('error' in obj) {
			obj.error = errors[key as keyof FormUserData];
		}
	}
};

router.post('/', async (req, res) => {
	const formData: FormUserData = req.body;
	const { errors, hasError } = validateUserData(formData);

	setInputValues(formData);
	setInputErrors(errors);

	if (hasError) {
		res.render('home', {
			css: css,
			formFields
		});
	} else {
		saveUserData(formData);
		res.redirect('/enquete');
	}
});

router.get('/', async (req, res) => {
	res.render('home', {
		css: css,
		formFields
	});
});

export default router;
