
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
var templateParser 	= require('./template');


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
			console.log("\tresolve scope: "  + scope );
			result.scopes[scope] = [];
			// var dir = path.resolve(appDir, scope);
			_.each(fs.readdirSync(path.resolve(appDir, scope)), function(template)
			{
				tasks.push(function (cb)
				{
					templateParser.readTemplateDir(configuration, template, scope, scopeDir, function(error, templateN)
					{
						if(!error)
						{
							result.scopes[scope].push(templateN);
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
 * Configures a dynamic template rendering handler
 */
function configure(app, configuration)
{
	console.log("deliver templates");
	//deliver templates
	app.all('/', function (request, response, next)
	{
		readAppDir(configuration, function(error, result)
		{
			if(!error)
			{
				var stream = nsmarty.assign('templates.tpl', result);
				stream.pipe(response);
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
