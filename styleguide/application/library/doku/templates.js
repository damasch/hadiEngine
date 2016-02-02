
/**
 * Requirements
 */
var fs = require('fs');
var path = require('path');
var S = require('string');
var _ = require('lodash');
var async = require('async');

function readAppDir(configuration, callback)
{
	console.log("read app dir");
	var tasks = [];
	var appDir = path.resolve(configuration.path.app, "");
	var result = {};
	result.scopes = [];

	_.each(configuration.doku.scope, function(scope)
	{
		var scopeDir = path.resolve(appDir, scope);
		if (fs.existsSync(scopeDir))
		{
			result.scopes[scope] = [];
			// var dir = path.resolve(appDir, scope);
			_.each(fs.readdirSync(path.resolve(appDir, scope)), function(template)
			{
				var templateDir = path.resolve(scopeDir, template);
				result.scopes[scope].push(templateDir);
			});
		}
	});

	//callback(error, result);
	async.series(tasks, function(error)
	{
		callback(error, result);
	});
}

/**
 * Configures a dynamic template rendering handler
 */
function configure(app, configuration)
{
	console.log("Serve templates");
	//Serve templates
	app.all('*', function (request, response, next)
	{
		console.log("read app dir");
		readAppDir(configuration, function(error, result)
		{
			if(!error)
			{
				console.log("-----------------");
				var markup = "";
				console.log(result.scopes);
				console.log("-----------------");

				response.send(result);
				response.end();
				console.log("end");
				return;
			}
			//Nope
			next();
		});
	});
};

/**
 * Public api
 */
module.exports = configure;
