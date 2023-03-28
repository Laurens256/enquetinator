import { FormUserData } from './handleUserData';
import { FormEnqueteData } from './handleEnqueteData';

// anders dan form user data omdat studentnumber type number moet zijn
const globalUserData = {
	name: '',
	studentnumber: NaN,
	email: ''
};

let globalChosenSemester: 1 | 2;

let globalEnqueteData: {
	[subject: string]: {
		teachers: any;
		semester: 1 | 2;
		overall_rating: number;
		difficulty_rating: number;
		explanation_rating: number;
		understanding_rating: number;
	}[];
} = {};

const saveUserData = (formUserData: FormUserData) => {
	console.log(formUserData);
	const { name, studentnumber, email } = formUserData;

	globalUserData.name = name;
	globalUserData.studentnumber = Number(studentnumber);
	globalUserData.email = email;
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

	globalEnqueteData[subject] = [
		{
			teachers: teachers,
			semester: Number(semester) as 1 | 2,
			overall_rating: Number(overall_rating),
			difficulty_rating: Number(difficulty_rating),
			explanation_rating: Number(explanation_rating),
			understanding_rating: Number(understanding_rating)
		}
	];
	globalChosenSemester = Number(semester) as 1 | 2;
};

export {
	saveUserData,
	globalUserData,
	saveSubjectData,
	globalEnqueteData,
	globalChosenSemester
};
