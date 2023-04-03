import { globalEnqueteData, globalChosenSemester } from '../formData/saveFormData';
import { RadioButton } from '../../types/FormField';
import { TempEnqueteData } from '../../types';

const setSemester = (subject: string, obj: RadioButton, tempData?: TempEnqueteData) => {
	const semester = tempData?.semester || globalEnqueteData[subject]?.semester || globalChosenSemester || NaN;

	// check if the semester has been saved
	if (!Number.isNaN(semester)) {
		// check if subject semester has been saved, otherwise fallback to global semester
		obj.options.forEach((option) => {
			if (option.value == String(semester)) {
				option.checked = true;
			} else {
				option.checked = false;
			}
		});
	}
};

const setRating = (subject: string, key: string, obj: RadioButton, tempData?: TempEnqueteData) => {
	const savedData = tempData || globalEnqueteData[subject];

	// check if the subject has data saved
	if (savedData && savedData[key as keyof typeof savedData]) {
		const savedValue = String(savedData[key as keyof typeof savedData]);

		// check if the saved value matches one of the options
		obj.options.forEach((option) => {
			if (option.value === savedValue) {
				option.checked = true;
			} else {
				option.checked = false;
			}
		});
	} else {
		// if no data is saved, make sure all options are unchecked
		obj.options.forEach((option) => {
			option.checked = false;
		});
	}
};

export { setSemester, setRating };
