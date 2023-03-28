interface FormFields {
	[key: string]: TextField | RadioButton;
}

interface DefaultFormInput {
	label: string;
	required: boolean;
	error: string;
}

interface TextField extends DefaultFormInput {
	textField: true;
	type: 'text';
	value: string;
	autocomplete?: string;
	readonly: boolean;
}

interface RadioButton extends DefaultFormInput {
	radioButton: true;
	type: 'radio';

	options: {
		label: string;
		value: string;
		id: string;
		checked: boolean;
	}[];
}

export { FormFields };
