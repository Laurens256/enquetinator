import { Request, Response, NextFunction } from 'express';
import { removeSubjectData } from '../utils/formData/saveFormData';

const skipSubject = (req: Request, res: Response, next: NextFunction) => {
	const subject = req.query.removesubject;

	if (subject && typeof subject === 'string') {
		removeSubjectData(subject);
	}

	next();
};

export { skipSubject };