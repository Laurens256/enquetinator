import { SubmitButton } from '../../types/FormField';

const setSubmitValue = (
	isLast: boolean,
	obj: SubmitButton
) => {
	if (isLast) {
		obj.value = 'Naar overzicht';
	} else {
		obj.value = 'Volgende';
	}
};

export { setSubmitValue };
