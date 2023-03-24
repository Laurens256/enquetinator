import { FormUserData } from './handleUserData';

const userData = {
	name: '',
	studentnumber: NaN,
	email: ''
};

const saveUserData = (FormUserData: FormUserData) => {
	const { name, studentnumber, email } = FormUserData;

	userData.name = name;
	userData.studentnumber = Number(studentnumber);
	userData.email = email;
};

// const getUserData = () => {
// 	return userData;
// };

export { saveUserData, userData };