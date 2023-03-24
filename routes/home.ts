import express from 'express';
const router = express.Router();

interface IFormData {
	name: string;
	studentnumber: string;
	email: string;
}

let formFields = [
	{
		type: 'text',
		name: 'name',
		label: 'Naam',
		autocomplete: 'name',
		classes: ['form-control'],
		required: true,
		value: '',
		error: ''
	},
	{
		type: 'number',
		name: 'studentnumber',
		label: 'Studentnummer',
		autocomplete: 'off',
		classes: ['form-control', 'nog-een-class'],
		required: true,
		value: '',
		error: ''
	},
	{
		type: 'email',
		name: 'email',
		label: 'Email',
		autocomplete: 'email',
		classes: ['form-control'],
		required: true,
		value: '',
		error: ''
	}
];

router.post('/', async (req, res) => {
	const formData: IFormData = req.body;
	const errors = validateForm(formData);

	if (errors.name || errors.studentnumber || errors.email) {
		// loop through formFields and set the value and error
		formFields.forEach((field) => {
			if (formData.hasOwnProperty(field.name)) {
				field.value = formData[field.name as keyof IFormData];
			}

			if (errors.hasOwnProperty(field.name)) {
				field.error = errors[field.name as keyof IFormData];
			}
		});

		res.render('home', {
			css: ['home'],
			formFields,
			errors
		});
	} else {
		res.send('ok');
	}
});

router.get('/', async (req, res) => {
	res.render('home', {
		css: ['home'],
		formFields
	});
});

// regex for validating email
const emailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const studentNrRegex = /^[0-9]{9}$/;

const validateForm = (formData: IFormData) => {
	const errors = {
		name: '',
		studentnumber: '',
		email: ''
	};
	const { name, studentnumber, email } = formData;

	if (name === '') {
		errors.name = 'Naam is verplicht';
	} else {
		errors.name = '';
	}

	if (email === '') {
		errors.email = 'Email is verplicht';
	} else if (!emailRegex.test(formData.email)) {
		errors.email = 'Email is niet geldig';
	} else {
		errors.email = '';
	}

	if (studentnumber === '') {
		errors.studentnumber = 'Studentnummer is verplicht';
	} else if (!studentNrRegex.test(formData.studentnumber)) {
		errors.studentnumber = 'Studentnummer is niet geldig';
	} else {
		errors.studentnumber = '';
	}

	return errors;
};

export default router;
