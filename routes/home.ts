import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
	res.render('home', {
		css: ['home']
	});
});

export default router;
