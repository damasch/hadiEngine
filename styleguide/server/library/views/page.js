
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

		if(file == "page.html")
		{
			var jsmart 	= require(configuration.path.styleguide.deliveries + '/jsmart');
			var params = {};
			params.title = 'Page';
			params.composition = '/composition/c-overview/view.tpl';
			var renderdTemplate = jsmart.renderTemplate(app, configuration, "./pages/p-default/view.tpl", params);
			response.send(renderdTemplate);
			return;
		}
		next();
	});
};

/**
 * Public api
 */
module.exports = configure;
