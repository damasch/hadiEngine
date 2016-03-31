
/**
 * Requirements
 */
var fs 				= require('fs');
var path 			= require('path');
var S 				= require('string');
var util 			= require('util');
var _ 				= require('lodash');
var async 			= require('async');
var templateParser 	= require('./template');

function getTemplate(request, configuration, callback)
{
	var tasks = [];
	var path = request.path.split('/');
	var scope = path[1];
	var template = path[2];
	var scopeDir = configuration.path.app + "/" + scope;
	var templateR = null;

	tasks.push(function (cb)
	{
		templateParser.readTemplateDir(configuration, template, scope, scopeDir, function(error, templateN)
		{
			if(!error)
			{
				templateR = templateN;
			}
			cb();
		});
	});

	//callback after stack
	async.series(tasks, function(error)
	{
		callback(error, templateR);
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
		var tasks = [];
		var extension = request.path.split('.').pop();
		var file = request.path.split('/').pop();

		if(file == "doku.html")
		{
			getTemplate(request, configuration, function(error, result)
			{
				if(!error) {
					console.log(result);
					response.send("done");
					return;
				}
				next();
			});
		}
	});
};

/**
 * Public api
 */
module.exports = configure;
