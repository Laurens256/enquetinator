import { FormUserData } from '../../types';

// regex for validating email
const emailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const studentNrRegex = /^[0-9]{9}$/;

const validateUserData = (formData: FormUserData) => {
	const errors = {
		name: '',
		studentnumber: '',
		email: ''
	};

	let { name, studentnumber, email } = formData;

	name = name.trim();
	studentnumber = studentnumber.trim();
	email = email.trim();


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

	const hasError = Object.values(errors).some((error) => error !== '');

	return { errors, hasError };
};

export { FormUserData, validateUserData };