import { globalEnqueteData } from '../formData/saveFormData';
import { Checkbox } from '../../types/FormField';
import { TempEnqueteData } from '../../types';

const teachers = [
	'Sanne',
	'Vasilis',
	'Robert',
	'Peter-Paul Koch',
	'Janno',
	'Declan',
	'Justus',
	'Koop',
	'Joost'
];

const setTeachers = (
	subjectInfo: { subject: string; teachers: string[] },
	obj: Checkbox,
	tempData?: TempEnqueteData
) => {
	const savedData = tempData || globalEnqueteData[subjectInfo.subject];
	// set the options for the teachers checkboxes
	obj.options = chooseTeachers(subjectInfo.teachers);

	// check the checkboxes that were previously checked
	if (savedData && savedData.teachers) {
		obj.options.forEach((option) => {
			if (savedData.teachers.includes(option.value)) {
				option.checked = true;
			} else {
				option.checked = false;
			}
		});
		// if there is no saved data, uncheck all checkboxes
	} else {
		obj.options.forEach((option) => {
			option.checked = false;
		});
	}
};

const chooseTeachers = (subjectTeachers: string[]) => {
	const options: { label: string; value: string; id: string }[] = [];
	if (subjectTeachers && subjectTeachers.length > 0) {
		subjectTeachers.forEach((teacher) => {
			options.push({
				label: `${teacher}`,
				value: `${teacher}`,
				id: `${teacher.toLowerCase()}`
			});
		});
	} else {
		teachers.forEach((teacher) => {
			options.push({
				label: `${teacher}`,
				value: `${teacher}`,
				id: `${teacher.toLowerCase()}`
			});
		});
	}
	return options;
};

export { setTeachers };
