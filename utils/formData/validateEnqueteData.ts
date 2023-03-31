import { FormEnqueteData, SaveableEnqueteData } from '../../types';

const validateEnqueteData = (formData: FormEnqueteData) => {
	const {
		subject,
		teachers,
		semester,
		overall_rating,
		difficulty_rating,
		explanation_rating,
		understanding_rating
	} = formData;

	let saveableData: SaveableEnqueteData = {};

	saveableData[subject] = {
		teachers: teachers,
		semester: Number(semester),
		overall_rating: Number(overall_rating),
		difficulty_rating: Number(difficulty_rating),
		explanation_rating: Number(explanation_rating),
		understanding_rating: Number(understanding_rating)
	};

	return saveableData;
};

export { FormEnqueteData, validateEnqueteData };
