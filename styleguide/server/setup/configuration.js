

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

	/**
	 * PATH FOR HTDOCS
	 */
	module.exports.path.htdocs 			= {}
	module.exports.path.htdocs.root 	= path.resolve(module.exports.path.root 			+ "/htdocs");
	module.exports.path.htdocs.app 		= path.resolve(module.exports.path.htdocs.root 		+ "/app");


	/**
	 * PATH FOR STYLEGUIDE
	 */
	module.exports.path.styleguide 				= {};
	module.exports.path.styleguide.root			= path.resolve(module.exports.path.root 				+ "/styleguide");
	module.exports.path.styleguide.server 		= path.resolve(module.exports.path.styleguide.root 		+ "/server");
	module.exports.path.styleguide.library 		= path.resolve(module.exports.path.styleguide.server 	+ "/library");
	module.exports.path.styleguide.setup 		= path.resolve(module.exports.path.styleguide.server 	+ "/setup");
	module.exports.path.styleguide.app 			= path.resolve(module.exports.path.styleguide.server 	+ "/app");
	module.exports.path.styleguide.templates 	= path.resolve(module.exports.path.styleguide.server 	+ "/app");
	module.exports.path.styleguide.server 		= path.resolve(module.exports.path.styleguide.library 	+ "/server");
	module.exports.path.styleguide.deliveries 	= path.resolve(module.exports.path.styleguide.library 	+ "/deliveries");
	module.exports.path.styleguide.views	 	= path.resolve(module.exports.path.styleguide.library 	+ "/views");
	module.exports.path.styleguide.doku 		= path.resolve(module.exports.path.styleguide.library 	+ "/doku");

	/**
	 * SERVER
	 */
	module.exports.server 				= {};
	module.exports.server.port 			= 8000;
	module.exports.server.path 			= path.resolve(module.exports.path.styleguide.server + "/run.js");

	module.exports.server.delay 		= {};
	module.exports.server.delay.statics = { min: 0, max: 0 };
	module.exports.server.delay.images 	= { min: 0, max: 0 };
	/**
	 * APPLICATION
	 */
	module.exports.doku 				= {};
	module.exports.doku.scope			= ["grids", "elements", "modules", "groups", "templates"];
