const form = document.querySelector('form');
const formElements = form.querySelectorAll('input');

const formNamesArr = Array.from(document.querySelectorAll('form input'));
const formNames = new Set(formNamesArr.map((el) => el.name));

const handleFormSubmit = (e) => {
	const formData = new FormData(e.target);

	// check if there are errors, if not continue
	const errors = validateForm(formData);
	if (Object.keys(errors).length > 0) {
		e.preventDefault();

		for (const [key, value] of Object.entries(errors)) {
			const errorField = document.querySelector(`.error-${key}`);
			if (errorField) {
				errorField.textContent = value;
			}
		}
	}
};

const validateForm = (formData) => {
	let errors = {};

	formNames.forEach((field) => {
		if (!formData.has(field)) {
			errors[field] = 'Dit veld is verplicht';
		}
	});

	return errors;
};

const clearForm = (e) => {
	e.preventDefault();

	formElements.forEach((el) => {
		if (el.type === 'text' || el.type === 'email' || el.type === 'number') {
			el.value = '';
		} else if (el.type === 'radio' || el.type === 'checkbox') {
			el.checked = false;
		}
	});
};

// form.addEventListener('submit', handleFormSubmit);
// form.addEventListener('reset', clearForm);
