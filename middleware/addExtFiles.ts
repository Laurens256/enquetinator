import { Request, Response, NextFunction } from 'express';
import routes from '../routes/routes';

// middleware to add javascript and css files to the view
const addExtFiles = (req: Request, res: Response, next: NextFunction) => {
	const viewName = routes.find((route) => route.path === req.path)?.viewName;

	if (viewName) {
		if (viewName in css) {
			res.locals.css = css[viewName as keyof typeof css];
		}
		if (viewName in js) {
			res.locals.js = js[viewName as keyof typeof js];
		}
	}

	next();
};

const css = {
	HomeView: ['form', 'partials/inputs/text'],
	EnqueteView: ['form', 'partials/inputs/radio', 'partials/progress'],
};

const js = {
	HomeView: ['home'],
	EnqueteView: ['enquete'],
};

export { addExtFiles };