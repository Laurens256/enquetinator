import express from 'express';
const router = express.Router();

interface IFormData {
	name: string;
	studentnumber: string;
	email: string;
}

router.post('/', async (req, res) => {
	const formData: IFormData = req.body;
	const errors = validateForm(formData);

	if (errors.length > 0) {
		res.render('home', {
			css: ['home'],
			errors
		});
	} else {
		res.send('ok');
	}
});

router.get('/', async (req, res) => {
	res.render('home', {
		css: ['home']
	});
});

// regex for validating email
const emailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const studentNrRegex = /^[0-9]{9}$/;

const validateForm = (formData: IFormData) => {
	const errors = [];
	const { name, studentnumber, email } = formData;

	if (name === '') {
		errors.push('Naam is verplicht');
	}

	if (email === '') {
		errors.push('Email is verplicht');
	} else if (!emailRegex.test(formData.email)) {
		errors.push('Email is niet geldig');
	}

	if (studentnumber === '') {
		errors.push('Studentnummer is verplicht');
	} else if (!studentNrRegex.test(formData.studentnumber)) {
		errors.push('Studentnummer is niet geldig');
	}

	return errors;
};

export default router;
