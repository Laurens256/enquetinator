interface FormFields {
	[key: string]: TextField | RadioButton | SubmitButton | HiddenInput | Checkbox;
}

interface DefaultFormInput {
	label: string;
	required?: boolean;
	error: string;
	classes?: string[];
}

interface TextField extends DefaultFormInput {
	type: 'text' | 'number' | 'email';
	value: string;
	autocomplete?: string;
}

interface RadioButton extends DefaultFormInput {
	type: 'radio';

	options: {
		label: string;
		value: string;
		id: string;
		checked?: boolean;
	}[];
}

interface Checkbox extends DefaultFormInput {
	type: 'checkbox';

	options: {
		label: string;
		value: string;
		id: string;
		checked?: boolean;
	}[];
};

interface SubmitButton {
	type: 'submit';
	value: string;
	resetable?: boolean;
	classes?: string[];
	error?: string;
}

interface HiddenInput {
	type: 'hidden';
	value: string;
	error?: string;
}

export { FormFields, TextField, RadioButton, SubmitButton, HiddenInput, Checkbox };
