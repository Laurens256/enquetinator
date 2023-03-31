import { Request, Response, NextFunction } from 'express';
import { removeSubjectData } from '../utils/formData/saveFormData';
import { getNextUri } from '../routes/enquete';

// middleware to skip a subject and delete its data
const skipSubject = (req: Request, res: Response, next: NextFunction) => {
	const subject = req.query.removesubject;

	if (subject && typeof subject === 'string') {
		removeSubjectData(subject);
		return res.redirect(getNextUri(subject, req.baseUrl));
	}

	next();
};

export { skipSubject };