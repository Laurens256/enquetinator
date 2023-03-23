const generateHeaderFooter = (_view: string) => {
	// remove leading slash using regexp and split on query string
	const view = _view.replace(/^\/+/, '').split('?')[0];

	let headerFooter: {
		header?: {};
		footer?: {};
	} = {};

	if (headers.hasOwnProperty(view)) {
		headerFooter.header = headers[view as keyof typeof headers];
	}
	if (footerControls.hasOwnProperty(view)) {
		headerFooter.footer = footerControls[view as keyof typeof footerControls];
	}

	return headerFooter;
};

const headers = {
	FilterView: ['POKéDEX', 'TABLE OF CONTENTS'],
	PokemonListView: ['POKéMON&nbsp;&nbsp;LIST'],
	PokemonDetailsView: ['POKéMON&nbsp;&nbsp;DETAILS'],
	ErrorView: ['404', 'PAGE NOT FOUND']
};

const footerControls = {
	FilterView: [
		{ classes: ['control-icon', 'd-pad', 'vertical'], text: 'PICK', key: 'ArrowDown' },
		{ classes: ['control-icon', 'a-button'], text: 'OK', key: 'a' }
	],
	PokemonListView: [
		{ classes: ['control-icon', 'd-pad', 'vertical'], text: 'PICK', key: 'ArrowDown' },
		{ classes: ['control-icon', 'a-button'], text: 'OK', key: 'a' },
		{ classes: ['control-icon', 'b-button'], text: 'CANCEL', key: 'b' }
	],
	PokemonDetailsView: [
		{ classes: ['control-icon', 'space-bar'], text: 'CRY', key: ' ' },
		{
			classes: ['control-icon', 'd-pad', 'right', 'left'],
			text: 'SWITCH',
			key: 'ArrowRight'
		},
		{ classes: ['control-icon', 'b-button'], text: 'CANCEL', key: 'b' }
	],
	ErrorView: [
		{ classes: ['control-icon', 'a-button'], text: 'OK', key: 'a' },
		{ classes: ['control-icon', 'd-pad', 'horizontal'], text: 'PICK', key: 'ArrowRight' }
	]
};

export { generateHeaderFooter };
