import { Request, Response, NextFunction } from 'express';
import { removeSubjectData } from '../utils/formData/saveFormData';
import { getAdjacentUri } from '../routes/enquete';

// middleware to skip a subject and delete its data
const skipSubject = (req: Request, res: Response, next: NextFunction) => {
	const subject = req.query.removesubject;

	if (subject && typeof subject === 'string') {
		removeSubjectData(subject);
		const { nextUri } = getAdjacentUri(req.baseUrl, 'next');
		return res.redirect(nextUri!);
	}

	next();
};

export { skipSubject };