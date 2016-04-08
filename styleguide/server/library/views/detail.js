
/**
 * Requirements
 */
var fs 				= require('fs');
var path 			= require('path');
var S 				= require('string');
var util 			= require('util');
var _ 				= require('lodash');
var async 			= require('async');

function getComponent(request, callback)
{
	var tasks = [];
	var path = request.path.split('/');
	var scope = path[1];
	var component = path[2];
	var scopeDir = GLOBAL._hadiEngine.path.htdocs.app + "/" + scope;
	var componentR = null;

	tasks.push(function (cb)
	{
		var componentParser = require(GLOBAL._hadiEngine.path.styleguide.deliveries + '/component');
		componentParser.readComponentDir(component, scope, scopeDir, function(error, componentN)
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
function configure(app)
{
	//deliver components
	app.all('*', function (request, response, next)
	{
		var tasks = [];
		var extension = request.path.split('.').pop();
		var file = request.path.split('/').pop();

		if(file == "detail.html")
		{
			getComponent(request, function(error, result)
			{
				if(!error)
				{
					var jsmart 	= require(GLOBAL._hadiEngine.path.styleguide.deliveries + '/jsmart');
					result.title = 'Detail ' + result.name;
					result.composition = '/composition/c-detail/view.tpl';
					var renderdTemplate = jsmart.renderTemplate(app, "./pages/p-default/view.tpl", result);
					response.send(renderdTemplate);
					return;
				}
				next();
			});
		} else
		{
			next();
		}
	});
};

/**
 * Public api
 */
module.exports = configure;
