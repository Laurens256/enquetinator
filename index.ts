import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';

// hbs
import { engine } from 'express-handlebars';
import hbsHelpers from './utils/handlebars/globalHelpers';

import routes from './routes/routes';

import { skipSubject } from './middleware/skipSubject';
import { addExtFiles } from './middleware/addExtFiles';

const app = express();

// handlebars stuff
app.engine(
	'hbs',
	engine({
		layoutsDir: `${path.join(__dirname)}/views`,
		partialsDir: `${path.join(__dirname)}/views/partials`,
		defaultLayout: 'main',
		extname: '.hbs',
		helpers: { ...hbsHelpers }
	})
);
app.set('view engine', 'hbs');
app.set('views', './views');

// static files
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(express.json(), express.urlencoded({extended: true}));

app.use('/enquete', skipSubject);
app.use(addExtFiles);

routes.forEach((route) => {
	app.use(route.path, route.view);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
