import express from 'express';
const router = express.Router();

const subjects = [
	'CSS To The Rescue',
	'Web App From Scratch',
	'Project 1',
	'Browser Technologies',
	'Progressive Web Apps',
	'Weekly Nerd'
];

const formFields = {};

router.post('/', (req, res) => {
	console.log(req.body);

	res.send('ok');
});

router.get('/', (req, res) => {
	res.render('enquete', {
		css: ['enquete']
	});
});

export default router;
