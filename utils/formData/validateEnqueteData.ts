import { FormEnqueteData, SaveableEnqueteData } from '../../types';

const fields = [
	'subject',
	'teachers',
	'semester',
	'overall_rating',
	'difficulty_rating',
	'explanation_rating',
	'understanding_rating'
];

const validateEnqueteData = (formData: FormEnqueteData) => {
	let errors: { [field: string]: string } = {};
	let hasError = false;

	fields.forEach((field) => {
		if (!formData[field as keyof typeof formData]) {
			errors[field] = 'Dit veld is verplicht';
			hasError = true;
		} else {
			errors[field] = '';
		}
	});

	if (hasError === false) {
		let saveableData: SaveableEnqueteData = {
			[formData.subject as keyof typeof formData]: {
				teachers: formData.teachers,
				semester: Number(formData.semester as string),
				overall_rating: Number(formData.overall_rating as string),
				difficulty_rating: Number(formData.difficulty_rating as string),
				explanation_rating: Number(formData.explanation_rating as string),
				understanding_rating: Number(formData.understanding_rating as string)
			}
		};

		return {
			errors,
			saveableData: saveableData
		};
	}
	return { errors };
};

export { FormEnqueteData, validateEnqueteData };
