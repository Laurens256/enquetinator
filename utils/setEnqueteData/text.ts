import { HiddenInput } from '../../types/FormField';

const setSubject = (subject: string, obj: HiddenInput) => {
	obj.value = subject;
};

const setTextField = () => {};

export { setSubject };
