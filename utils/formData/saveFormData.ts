import { FormUserData } from './validateUserData';
import { FormEnqueteData, SaveableEnqueteData } from '../../types';

// anders dan form user data omdat studentnumber type number moet zijn
const globalUserData = {
	name: '',
	studentnumber: NaN,
	email: ''
};

let globalChosenSemester: 1 | 2;

let globalEnqueteData: SaveableEnqueteData = {};

const saveUserData = (formUserData: FormUserData) => {
	const { name, studentnumber, email } = formUserData;

	globalUserData.name = name;
	globalUserData.studentnumber = Number(studentnumber);
	globalUserData.email = email;
};

const saveSubjectData = (data: SaveableEnqueteData) => {
	globalEnqueteData = { ...globalEnqueteData, ...data };
	console.log(globalEnqueteData);
};

export {
	saveUserData,
	globalUserData,
	saveSubjectData,
	globalEnqueteData,
	globalChosenSemester
};
