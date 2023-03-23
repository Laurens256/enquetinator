import enquete from './enquete';
import home from './home';
import error from './error';

const routes = [
	{ path: '/enquete', view: enquete, viewName: 'EnqueteView' },
	{ path: '/', view: home, viewName: 'HomeView' },
	{ path: '*', view: error, viewName: 'ErrorView' }
];

export default routes;