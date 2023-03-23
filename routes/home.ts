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

	console.log(formData);

	if (errors.name || errors.studentnumber || errors.email) {
		res.render('home', {
			css: ['home'],
			formData,
			errors,
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
	const errors: {
		name?: string;
		studentnumber?: string;
		email?: string;
	} = {};
	const { name, studentnumber, email } = formData;

	if (name === '') {
		errors.name = 'Naam is verplicht';
	}

	if (email === '') {
		errors.email = 'Email is verplicht';
	} else if (!emailRegex.test(formData.email)) {
		errors.email = 'Email is niet geldig';
	}

	if (studentnumber === '') {
		errors.studentnumber = 'Studentnummer is verplicht';
	} else if (!studentNrRegex.test(formData.studentnumber)) {
		errors.studentnumber = 'Studentnummer is niet geldig';
	}

	return errors;
};

export default router;
