import express from 'express';
import { validateUserData, FormUserData } from '../utils/formData/handleUserData';
import { saveUserData, userData } from '../utils/formData/saveFormData';
const router = express.Router();

const formFields = {
	name: {
		type: 'text',
		label: 'Naam',
		autocomplete: 'name',
		classes: ['form-control'],
		required: true,
		value: '',
		error: ''
	},
	studentnumber: {
		type: 'number',
		label: 'Studentnummer',
		autocomplete: 'off',
		classes: ['form-control', 'nog-een-class'],
		required: true,
		value: '',
		error: ''
	},
	email: {
		type: 'email',
		label: 'Email',
		autocomplete: 'email',
		classes: ['form-control'],
		required: true,
		value: '',
		error: ''
	}
};


const css = ['home', 'partials/inputs/text'];
router.post('/', async (req, res) => {
	const formData: FormUserData = req.body;
	const { errors, hasError } = validateUserData(formData);

	if (hasError) {
		// set values and errors as needed
		for (const [key, obj] of Object.entries(formFields)) {
			if (formData.hasOwnProperty(key)) {
				obj.value = formData[key as keyof FormUserData];
			}

			if (errors.hasOwnProperty(key)) {
				obj.error = errors[key as keyof FormUserData];
			}
		}

		res.render('home', {
			css: css,
			formFields,
			errors
		});
	} else {
		saveUserData(formData);

		// set the saved values to be default and remove errors
		for (const [key, obj] of Object.entries(formFields)) {
			if(userData.hasOwnProperty(key)) {
				obj.value = String(userData[key as keyof typeof userData]);
			}
			obj.error = '';
		}

		res.redirect('/enquete');
	}
});

router.get('/', async (req, res) => {
	res.render('home', {
		css: css,
		formFields,
		userData
	});
});

export default router;
