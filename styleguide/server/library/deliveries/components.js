
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
var componentParser 	= require('./component');


function readAppDir(configuration, callback)
{
	console.log("read configuration.path.htdocs.app: " + configuration.path.htdocs.app);
	var tasks = [];
	var appDir = path.resolve(configuration.path.htdocs.app, "");
	var result = {};
	result.scopes = {};

	// Read doku Scope
	console.log("read configuration.doku.scope: " + configuration.doku.scope);
	_.each(configuration.doku.scope, function(scope)
	{
		var scopeDir = path.resolve(appDir, scope);
		if (fs.existsSync(scopeDir))
		{
			console.log("resolve scope: "  + scope );
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
	console.log("deliver components");
	//deliver components
	app.all('/', function (request, response, next)
	{
		readAppDir(configuration, function(error, result)
		{
			if(!error)
			{
				response.send("components");
				return;
			}
			//Nope
		});
		next();
	});
};

/**
 * Public api
 */
module.exports = configure;
