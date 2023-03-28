import { FormUserData } from './validateUserData';
import { FormEnqueteData, SaveableEnqueteData } from '../../types';

// anders dan form user data omdat studentnumber type number moet zijn
const globalUserData = {
	name: '',
	studentnumber: NaN,
	email: ''
};

let globalChosenSemester: number = NaN;

let globalEnqueteData: SaveableEnqueteData = {};

const saveUserData = (formUserData: FormUserData) => {
	const { name, studentnumber, email } = formUserData;

	globalUserData.name = name;
	globalUserData.studentnumber = Number(studentnumber);
	globalUserData.email = email;
};

const saveSubjectData = (data: SaveableEnqueteData) => {
	globalEnqueteData = { ...globalEnqueteData, ...data };
	// console.log(globalEnqueteData);

	if (Number.isNaN(globalChosenSemester)) {
		const subject = Object.keys(data)[0];
		globalChosenSemester = data[subject].semester;
	}
};

export {
	saveUserData,
	globalUserData,
	saveSubjectData,
	globalEnqueteData,
	globalChosenSemester
};
