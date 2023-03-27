import express from 'express';
const router = express.Router();

const subjects = [
	'CSS To The Rescue',
	'Web App From Scratch',
	'Project 1',
	'Browser Technologies',
	'Progressive Web App'
];

const subjectsUri = [
	'css-to-the-rescue',
	'web-app-from-scratch',
	'project-1',
	'browser-technologies',
	'progressive-web-app'
];

const formFields = {
	subject: {
		type: 'text',
		label: 'Vak',
		autocomplete: 'off',
		required: true,
		disabled: true,
		value: '',
		error: ''
	},

	semester: {
		type: 'radio',
		label: 'In welk semester heb je dit vak gevolgd?',
		required: true,
		error: '',
		options: {
			1: { label: '1', value: '1', id: 'semester-1' },
			2: { label: '2', value: '2', id: 'semester-2' },
			3: { label: '3', value: '3', id: 'semester-3' },
			4: { label: '4', value: '4', id: 'semester-4' },
			5: { label: '5', value: '5', id: 'semester-5' },
			6: { label: '6', value: '6', id: 'semester-6' },
			7: { label: '7', value: '7', id: 'semester-7' },
			8: { label: '8', value: '8', id: 'semester-8' },
			9: { label: '9', value: '9', id: 'semester-9' },
			10: { label: '10', value: '10', id: 'semester-10' }
		}
	}
};

router.post('/', (req, res) => {
	console.log(req.body);

	res.send('ok');
});

router.get('/', (req, res) => {
	let subject = req.query.vak;
	if (
		!(typeof subject === 'string' && subjectsUri.includes(subject)) ||
		typeof subject !== 'string'
	) {
		subject = subjectsUri[0];
		res.redirect(`${req.baseUrl}?vak=${subject}`);
	}

	formFields.subject.value = subject;

	res.render('enquete', {
		css: ['enquete', 'partials/inputs/text', 'partials/inputs/radio'],
		formFields
	});
});

export default router;
