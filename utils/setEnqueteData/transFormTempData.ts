import { FormEnqueteData } from '../../types';

const transformTempData = (tempData: FormEnqueteData) => {
	const {
		subject,
		teachers,
		semester,
		overall_rating,
		difficulty_rating,
		explanation_rating,
		understanding_rating
	} = tempData;
	return {
		subject: subject,
		teachers,
		semester: Number(semester),
		overall_rating: Number(overall_rating),
		difficulty_rating: Number(difficulty_rating),
		explanation_rating: Number(explanation_rating),
		understanding_rating: Number(understanding_rating)
	};
};

export { transformTempData };
