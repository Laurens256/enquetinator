const form = document.querySelector('form');
const formElements = form.querySelectorAll('input');

const handleFormSubmit = (e) => {
	const formData = new FormData(e.target);

	const errors = {
		name: validateName(formData.get('name')),
		studentnumber: validateStudentNumber(formData.get('studentnumber')),
		email: validateEmail(formData.get('email'))
	};

	if (errors.name || errors.studentnumber || errors.email) {
		e.preventDefault();

		for (const [key, value] of Object.entries(errors)) {
			const errorField = document.querySelector(`.error-${key}`);
			if (errorField) {
				if (value !== '') {
					errorField.textContent = `*${value}`;
				} else {
					errorField.textContent = '';
				}
			}

			const inputField = document.querySelector(`input[name="${key}"]`);
			if (inputField) {
				inputField.dataset.errorMsg = value;
			}
		}
	}	
};

const regex = {
	email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
	studentNumber: /^[0-9]{9}$/
};

const validateName = (name) => {
	if (!name || name.length === 0) {
		return 'Naam is verplicht';
	} else {
		return '';
	}
};

const validateEmail = (email) => {
	if (!email || email.length === 0) {
		return 'Email is verplicht';
	} else if (!regex.email.test(email)) {
		return 'Vul een geldig emailadres in';
	} else {
		return '';
	}
};

const validateStudentNumber = (studentNumber) => {
	if (!studentNumber || studentNumber.length === 0) {
		return 'Studentnummer is verplicht; 9 cijfers zonder speciale tekens toegestaan';
	} else if (!regex.studentNumber.test(studentNumber)) {
		return 'Studentnummer is niet geldig; 9 cijfers zonder speciale tekens toegestaan';
	} else {
		return '';
	}
};

form.addEventListener('submit', handleFormSubmit);
