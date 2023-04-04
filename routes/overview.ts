import express from 'express';

import { globalEnqueteData } from '../utils/formData/saveFormData';
import { subjectInfo } from './enquete';

const router = express.Router();

const generateOverviewData = () => {
	let completeSubjects: {[subject: string]: boolean} = {};

	for (const subject of subjectInfo) {
		completeSubjects[subject.subject] = subject.subject in globalEnqueteData;
	}

	return completeSubjects;
};

router.get('/', (req, res) => {
	const completeSubjects = generateOverviewData();
	res.render('overview', {
		...res.locals,
		completeSubjects,
	});
});


export default router;
