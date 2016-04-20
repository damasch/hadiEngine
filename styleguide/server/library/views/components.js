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

function readAppDir(callback)
{
	var tasks = [];
	var appDir = path.resolve(hadiEngine.path.htdocs.app, "");
	var result = {};
	result.scopes = {};

	_.each(hadiEngine.doku.scope, function(scope)
	{
		var scopeDir = path.resolve(appDir, scope);
		if (fs.existsSync(scopeDir))
		{
			result.scopes[scope] = [];
			// var dir = path.resolve(appDir, scope);
			_.each(fs.readdirSync(path.resolve(appDir, scope)), function(component)
			{
				tasks.push(function (cb)
				{
					var componentParser = require(hadiEngine.path.styleguide.deliveries + '/component');
					componentParser.readComponentDir(component, scope, scopeDir, function(error, componentN)
					{
						if(!error)
						{
							result.scopes[scope].push(componentN);
						}
						cb();
					});
				});
			});
		}
	});

	//callback after stack
	async.series(tasks, function(error)
	{
		callback(error, result);
	});
}

/**
 * Configures a dynamic component rendering handler
 */
function configure(app)
{
	//deliver components
	app.all('/', function (request, response, next)
	{
		readAppDir(function(error, scopes)
		{
			if(!error)
			{
                var data = {};

                let compositionClass = require(hadiEngine.path.styleguide.templates + '/compositions/c-overview/controller.js');
                let composition = new compositionClass();

                let rendererClass = require(hadiEngine.path.styleguide.hadi + '/Renderer.js');
                let renderer = new rendererClass(composition);
                renderer.registerTemplates([
                    hadiEngine.path.styleguide.templates + "/modules/m-detail/controller.js",
                    hadiEngine.path.styleguide.templates + "/modules/m-scopes/controller.js",
                    hadiEngine.path.styleguide.templates + "/modules/m-components/controller.js",
                    hadiEngine.path.styleguide.templates + "/modules/m-component/controller.js",
                    hadiEngine.path.styleguide.templates + "/modules/m-test/controller.js",
                    hadiEngine.path.styleguide.templates + "/modules/m-navigation/controller.js"
                ]);

                var result = "default";
                data.title = "Page";
                data.composition = renderer.render(scopes);

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
	});
};

/**
 * Public api
 */
module.exports = configure;
