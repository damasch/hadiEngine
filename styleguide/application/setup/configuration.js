

	/**
	 * Requirements
	 */
	var path = require('path');

	module.exports = {};

	/**
	 * PATH
	 */
	module.exports.path 				= {};
	module.exports.path.root 			= path.resolve("../");
	module.exports.path.htdocs 			= path.resolve(module.exports.path.root 		+ "/htdocs");
	module.exports.path.app 			= path.resolve(module.exports.path.htdocs 		+ "/app");
	module.exports.path.styleguide 		= path.resolve(module.exports.path.root 		+ "/styleguide");
	module.exports.path.application 	= path.resolve(module.exports.path.styleguide 	+ "/application");
	module.exports.path.library 		= path.resolve(module.exports.path.application 	+ "/library");
	module.exports.path.setup 			= path.resolve(module.exports.path.application 	+ "/setup");
	module.exports.path.server 			= path.resolve(module.exports.path.library 		+ "/server");
	module.exports.path.deliveries 		= path.resolve(module.exports.path.library 		+ "/deliveries");
	module.exports.path.doku 			= path.resolve(module.exports.path.library 		+ "/doku");
	module.exports.path.templates 		= path.resolve(module.exports.path.library 		+ "/templates");

	/**
	 * SERVER
	 */
	module.exports.server = {};
	module.exports.server.port = 8000;
	module.exports.server.path = path.resolve(module.exports.path.server + "/run.js");

	module.exports.server.delay = {};
	module.exports.server.delay.statics = { min: 0, max: 0 };
	module.exports.server.delay.images = { min: 0, max: 0 };
	/**
	 * APPLICATION
	 */
	module.exports.doku 				= {};
	module.exports.doku.scope			= ["grids", "elements", "modules", "groups", "templates"];
