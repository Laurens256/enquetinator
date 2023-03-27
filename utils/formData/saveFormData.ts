import { FormUserData } from './handleUserData';
import { FormEnqueteData } from './handleEnqueteData';

// anders dan form user data omdat studentnumber type number moet zijn
let userData: {
	name: string;
	studentnumber: number;
	email: string;
};

let chosenSemester: 1 | 2;

let subjectData: {
	[subject: string]: {
		teachers: any;
		semester: 1 | 2;
		overall_rating: number;
		difficulty_rating: number;
		explanation_rating: number;
		understanding_rating: number;
	}[];
};

const saveUserData = (FormUserData: FormUserData) => {
	const { name, studentnumber, email } = FormUserData;

	userData.name = name;
	userData.studentnumber = Number(studentnumber);
	userData.email = email;
};

const saveSubjectData = (subject: string, data: FormEnqueteData) => {
	const {
		teachers,
		semester,
		overall_rating,
		difficulty_rating,
		explanation_rating,
		understanding_rating
	} = data;

	subjectData[subject] = [
		{
			teachers: teachers,
			semester: Number(semester) as 1 | 2,
			overall_rating: Number(overall_rating),
			difficulty_rating: Number(difficulty_rating),
			explanation_rating: Number(explanation_rating),
			understanding_rating: Number(understanding_rating)
		}
	];
	chosenSemester = Number(semester) as 1 | 2;
};

export { saveUserData, userData, saveSubjectData, subjectData, chosenSemester };
