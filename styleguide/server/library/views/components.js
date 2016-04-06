
/**
 * Requirements
 */
var fs 				= require('fs');
var path 			= require('path');
var S 				= require('string');
var util 			= require('util');
var _ 				= require('lodash');
var async 			= require('async');
var nsmarty 		= require('nsmarty');

function readAppDir(configuration, callback)
{
	var tasks = [];
	var appDir = path.resolve(configuration.path.htdocs.app, "");
	var result = {};
	result.scopes = {};

	// Read doku Scope
	console.log("HADI:\tread configuration.path.htdocs.app: " + configuration.path.htdocs.app);
	console.log("HADI:\tread configuration.doku.scope: " + configuration.doku.scope);

	_.each(configuration.doku.scope, function(scope)
	{
		var scopeDir = path.resolve(appDir, scope);
		if (fs.existsSync(scopeDir))
		{
			//console.log("HADI:\tresolve scope:\t"  + scope );
			result.scopes[scope] = [];
			// var dir = path.resolve(appDir, scope);
			_.each(fs.readdirSync(path.resolve(appDir, scope)), function(component)
			{
				tasks.push(function (cb)
				{
					var componentParser = require(configuration.path.styleguide.deliveries + '/component');
					componentParser.readComponentDir(configuration, component, scope, scopeDir, function(error, componentN)
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
function configure(app, configuration)
{
	//deliver components
	app.all('/', function (request, response, next)
	{
		readAppDir(configuration, function(error, result)
		{
			if(!error)
			{
				var jsmart 	= require(configuration.path.styleguide.deliveries + '/jsmart');
				result.title = 'Overview ' + result.name;
				result.composition = '/composition/c-overview/view.tpl';
				var renderdTemplate = jsmart.renderTemplate(app, configuration, "./pages/p-default/view.tpl", result);

				response.send(renderdTemplate);
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
