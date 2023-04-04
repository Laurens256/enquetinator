const form = document.querySelector('form');
const formElements = form.querySelectorAll('input');

const formNamesArr = Array.from(document.querySelectorAll('form input'));
const formNames = new Set(formNamesArr.map((el) => el.name));

const handleFormSubmit = (e) => {
	const formData = new FormData(e.target);

	// check if there are errors, if not continue
	const { errors, hasErrors } = validateForm(formData);
	if (hasErrors) {
		e.preventDefault();

		for (const [key, value] of Object.entries(errors)) {
			const errorField = document.querySelector(`.error-${key}`);
			if (errorField) {
				errorField.textContent = value;
			}
		}

		const firstError = document.querySelector('p[class^="error-"]:not(:empty)');
		if (firstError) {
			firstError.scrollIntoView({
				behavior: 'smooth',
				block: 'center'
			});
		}
	}
};

const validateForm = (formData) => {
	let errors = {};
	let hasErrors = false;

	formNames.forEach((field) => {
		if (!formData.has(field)) {
			errors[field] = 'Dit veld is verplicht';
			hasErrors = true;
		} else {
			errors[field] = '';
		}
	});

	return { errors, hasErrors };
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
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
};

form.addEventListener('submit', handleFormSubmit);
form.addEventListener('reset', clearForm);
