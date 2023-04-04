import overview from './overview';
import enquete from './enquete';
import home from './home';
import error from './error';

const routes = [
	{ path: '/overview', view: overview, viewName: 'OverviewView' },
	{ path: '/enquete', view: enquete, viewName: 'EnqueteView' },
	{ path: '/', view: home, viewName: 'HomeView' },
	{ path: '*', view: error, viewName: 'ErrorView' }
];

export default routes;