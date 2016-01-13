// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.

var appBaseUrl = '/app';

requirejs.config({
	baseUrl: appBaseUrl,
	paths: {
		'application': './app',
		'scripts': '../js',
		'library': '../js/lib',
		'engine': '../js/core',
		'helper': './helper',
		'grids': './grids',
		'elements': './elements',
		'modules': './modules',
		'groups': './groups',
		'pages': './pages',
		'root': '../',
	},
	map: {
		'*': {
			'jQuery': 'library/jquery',
			'jquery': 'library/jquery',
			'$': 'library/jquery',
			'smarty': 'library/smart',
			'renderer': 'engine/view/render',
		}
	}
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['main']);
