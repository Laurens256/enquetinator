type EnqueteData = {
	[subject: string]: {
		teachers: any;
		semester: number;
		overall_rating: number;
		difficulty_rating: number;
		explanation_rating: number;
		understanding_rating: number;
	}[];
};

const validateEnqueteData = (formData: EnqueteData) => {
	// if() {
	// }
};

const saveFormData = (formData: FormData) => {};

export { EnqueteData, validateEnqueteData };
