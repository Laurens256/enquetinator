import { FormEnqueteData, SaveableEnqueteData } from '../../types';

// const validateEnqueteData = (formData: FormEnqueteData) => {
// 	const {
// 		subject,
// 		teachers,
// 		semester,
// 		overall_rating,
// 		difficulty_rating,
// 		explanation_rating,
// 		understanding_rating
// 	} = formData;

// 	let saveableData: SaveableEnqueteData = {};

// 	saveableData[subject] = {
// 		teachers: teachers,
// 		semester: Number(semester),
// 		overall_rating: Number(overall_rating),
// 		difficulty_rating: Number(difficulty_rating),
// 		explanation_rating: Number(explanation_rating),
// 		understanding_rating: Number(understanding_rating)
// 	};

// 	return saveableData;
// };

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

	fields.forEach((field) => {
		if (!formData[field as keyof typeof formData]) {
			errors[field] = 'Dit veld is verplicht';
		}
	});

	if (Object.keys(errors).length === 0) {
		let saveableData: SaveableEnqueteData = {
			[formData.subject as keyof typeof formData]: {
				teachers: formData.teachers as string,
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
