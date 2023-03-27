type FormEnqueteData = {
	[subject: string]: {
		teachers: any;
		semester: '1' | '2';
		overall_rating: string;
		difficulty_rating: string;
		explanation_rating: string;
		understanding_rating: string;
	}[];
};

const validateEnqueteData = (formData: FormEnqueteData) => {
	// if() {
	// }

	let saveableData = {};
};

export { FormEnqueteData, validateEnqueteData };
