
/**
 * Requirements
 */
var fs = require('fs');
var path = require('path');
var S = require('string');
var _ = require('lodash');
var async = require('async');
var templateParser = require('./template');



function readAppDir(configuration, callback)
{
	console.log("read configuration.path.app: " + configuration.path.app);
	var tasks = [];
	var appDir = path.resolve(configuration.path.app, "");
	var result = {};
	result.scopes = {};

	// Read doku Scope
	console.log("read configuration.doku.scope: " + configuration.doku.scope);
	_.each(configuration.doku.scope, function(scope)
	{
		var scopeDir = path.resolve(appDir, scope);
		if (fs.existsSync(scopeDir))
		{
			result.scopes[scope] = [];
			// var dir = path.resolve(appDir, scope);
			_.each(fs.readdirSync(path.resolve(appDir, scope)), function(template)
			{
				tasks.push(function (cb)
				{
					var templateDir = path.resolve(scopeDir, template);
					var template
					result.scopes[scope].push(templateParser.readTemplateDir(configuration, template, scope, scopeDir));
					//result.scopes[scope][template] = templateParser.readTemplateDir(configuration, template, scope, scopeDir);
					cb();
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
 * Configures a dynamic template rendering handler
 */
function configure(app, configuration)
{
	console.log("deliver templates");
	//deliver templates
	app.all('*', function (request, response, next)
	{
		readAppDir(configuration, function(error, result)
		{
			if(!error)
			{
				console.log("START -> Get Templates");
				var markup = "<pre>";
				markup += JSON.stringify(result.scopes, null, 4);
				markup += "</pre>";
				response.send(markup.toString());

				response.end();
				console.log(result.scopes);
				console.log("END -> Get Templates");
				return;
			}
			//Nope
			next();
		});
		console.log("end");
	});
};

/**
 * Public api
 */
module.exports = configure;
