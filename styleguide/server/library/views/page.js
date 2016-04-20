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
            var data = {};

            let compositionClass = require(hadiEngine.path.styleguide.templates + '/compositions/c-page/controller.js');
            let composition = new compositionClass();

            let rendererClass = require(hadiEngine.path.styleguide.hadi + '/Renderer.js');
            let renderer = new rendererClass(composition);
            renderer.registerTemplates([
                hadiEngine.path.styleguide.templates + "/modules/m-detail/controller.js",
                hadiEngine.path.styleguide.templates + "/modules/m-test/controller.js",
                hadiEngine.path.styleguide.templates + "/modules/m-navigation/controller.js",
            ]);
            var result = "default";
            data.title = "Page";
            data.composition = renderer.render({});

            let pageClass = require(hadiEngine.path.styleguide.templates + '/pages/p-default/controller.js');
            let page = new pageClass();
            renderer = new rendererClass(page);
            renderer.registerTemplates([
                hadiEngine.path.styleguide.templates + "/modules/m-navigation/controller.js"
            ]);
            result = renderer.render(data);

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
