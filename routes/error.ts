import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
	res.render('error', {});
});

export default router;