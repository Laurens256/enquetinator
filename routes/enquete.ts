import express from 'express';
const router = express.Router();

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