type TempEnqueteData = {
	subject: string;
	teachers: string[];
	semester: number;
	overall_rating: number;
	difficulty_rating: number;
	explanation_rating: number;
	understanding_rating: number;
};

type FormEnqueteData = {
	subject: string;
	teachers: string[];
	semester: string;
	overall_rating: string;
	difficulty_rating: string;
	explanation_rating: string;
	understanding_rating: string;
};

type SaveableEnqueteData = {
	[subject: string]: {
		teachers: string[];
		semester: number;
		overall_rating: number;
		difficulty_rating: number;
		explanation_rating: number;
		understanding_rating: number;
	};
};

export { FormEnqueteData, SaveableEnqueteData, TempEnqueteData };
