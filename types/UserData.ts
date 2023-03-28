type FormUserData = {
	name: string;
	studentnumber: string;
	email: string;
};

type SaveableUserData = FormUserData;
type FormUserErrors = FormUserData;

export { FormUserData, SaveableUserData, FormUserErrors };