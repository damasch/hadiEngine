
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
	var appDir = path.resolve(GLOBAL._hadiEngine.path.htdocs.app, "");
	var result = {};
	result.scopes = {};

	_.each(GLOBAL._hadiEngine.doku.scope, function(scope)
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
					var componentParser = require(GLOBAL._hadiEngine.path.styleguide.deliveries + '/component');
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
		readAppDir(function(error, result)
		{
			if(!error)
			{
				/*
				var jsmart 	= require(GLOBAL._hadiEngine.path.styleguide.deliveries + '/jsmart');
				result.title = 'Overview ' + result.name;
				result.composition = '/composition/c-overview/view.tpl';
				var renderdTemplate = jsmart.renderTemplate(app, "./pages/p-default/view.tpl", result);
				 response.send(renderdTemplate);
				*/
				response.send("Components");
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
