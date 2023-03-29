interface FormFields {
	[key: string]: TextField | RadioButton | SubmitButton;
}

interface DefaultFormInput {
	label: string;
	required: boolean;
	error: string;
}

interface TextField extends DefaultFormInput {
	type: 'text';
	value: string;
	autocomplete?: string;
	readonly: boolean;
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

interface SubmitButton {
	type: 'submit';
	value: string;
}

export { FormFields };
