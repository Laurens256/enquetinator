import express from 'express';
import { validateUserData } from '../utils/formData/validateUserData';
import { saveUserData } from '../utils/formData/saveFormData';

import { FormFields, FormUserData, FormUserErrors } from '../types';

const router = express.Router();

const formFields: FormFields = {
	name: {
		type: 'text',
		label: 'Naam',
		autocomplete: 'name',
		required: true,
		value: '',
		error: '',
	},
	studentnumber: {
		type: 'text',
		label: 'Studentnummer',
		autocomplete: 'off',
		required: true,
		value: '',
		error: '',
		pattern: '[0-9]{9}',
		maxlength: 9,
	},
	email: {
		type: 'email',
		label: 'Email',
		autocomplete: 'email',
		required: true,
		value: '',
		error: '',
		pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
	},
	submit: {
		type: 'submit',
		value: 'Verstuur',
		classes: ['underline']
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
			...res.locals,
			formFields
		});
	} else {
		saveUserData(formData);
		res.redirect('/enquete?vak=css-to-the-rescue');
	}
});

router.get('/', async (req, res) => {
	res.render('home', {
		...res.locals,
		formFields
	});
});

export default router;
