'use strict';

/**
 * Requirements
 */
var fs 				= require('fs');
var path 			= require('path');
var S 				= require('string');
var util 			= require('util');
var _ 				= require('lodash');
var async 			= require('async');

/**
 * Configures a dynamic component rendering handler
 */
function configure(app)
{
	//deliver components
	app.all('*', function (request, response, next)
	{
		var tasks = [];
		var extension = request.path.split('.').pop();
		var file = request.path.split('/').pop();

		if(file == "page.html")
		{
			let rendererClass = require(GLOBAL._hadiEngine.path.styleguide.hadi + '/Renderer.js');
			let renderer = new rendererClass(
				'/compositions/c-page/controller.js',
				'/pages/p-default/controller.js',
				GLOBAL._hadiEngine.path.styleguide.templates);

			renderer.registerTemplates([
				GLOBAL._hadiEngine.path.styleguide.templates + "/modules/m-detail/controller.js",
				GLOBAL._hadiEngine.path.styleguide.templates + "/modules/m-test/controller.js",
				GLOBAL._hadiEngine.path.styleguide.templates + "/modules/m-navigation/controller.js",
			]);

			var data = {
				title: "Page"
			};
			var result = renderer.render(data);
			response.send(result);
			return;
		}
		next();
	});
};

/**
 * Public api
 */
module.exports = configure;
