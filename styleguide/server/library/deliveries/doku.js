
/**
 * Requirements
 */
var fs 				= require('fs');
var path 			= require('path');
var S 				= require('string');
var util 			= require('util');
var _ 				= require('lodash');
var async 			= require('async');
var componentParser = require('./component');
var nsmarty 		= require('nsmarty');
var jsmart 			= require('./jsmart');


function getComponent(request, configuration, callback)
{
	var tasks = [];
	var path = request.path.split('/');
	var scope = path[1];
	var component = path[2];
	var scopeDir = configuration.path.htdocs.app + "/" + scope;
	var componentR = null;

	tasks.push(function (cb)
	{
		componentParser.readComponentDir(configuration, component, scope, scopeDir, function(error, componentN)
		{
			if(!error)
			{
				componentR = componentN;
			}
			cb();
		});
	});

	//callback after stack
	async.series(tasks, function(error)
	{
		callback(error, componentR);
	});
}

/**
 * Configures a dynamic component rendering handler
 */
function configure(app, configuration)
{
	//deliver components
	app.all('*', function (request, response, next)
	{
		var tasks = [];
		var extension = request.path.split('.').pop();
		var file = request.path.split('/').pop();

		if(file == "doku.html")
		{ 
			getComponent(request, configuration, function(error, result)
			{
				if(!error)
				{
					var renderdTemplate = jsmart.renderTemplate(app, configuration, "./modules/m-component/component.tpl", result);
					response.send(renderdTemplate);
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
