
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
var componentParser = require('./component');
var jsmart 			= require('./jsmart');


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
				var renderdTemplate = jsmart.renderTemplate(app, configuration, "./modules/m-components/view.tpl", result);
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
