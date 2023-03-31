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
	HomeView: ['partials/form', 'partials/inputs/text'],
	EnqueteView: ['partials/form', 'partials/inputs/text', 'partials/inputs/radio'],
};

const js = {
	EnqueteView: ['enquete'],
};

export { addExtFiles };