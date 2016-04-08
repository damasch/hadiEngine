'use strict';

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
function configure(app)
{
	//deliver components
	app.all('*', function (request, response, next)
	{
		var tasks = [];
		var extension = request.path.split('.').pop();
		var file = request.path.split('/').pop();

		if(file == "page.html")
		{
			let Controller = require(GLOBAL._hadiEngine.path.styleguide.templates + '/pages/p-default/controller.js');
			let controller = new Controller();

			response.send("foo");
			return;
		}
		next();
	});
};

/**
 * Public api
 */
module.exports = configure;


/*
 let BaseController = require(GLOBAL._hadiEngine.path.styleguide.hadi + '/engine/BaseController.js');
 let c = new BaseController();
 */

/*
 let Renderer = require(GLOBAL._hadiEngine.path.styleguide.hadi + '/renderer.js');
 let renderer = new Renderer(GLOBAL._hadiEngine);
 renderer.registerModules(["a"]);
 renderer.render();
 */

/*
 var hadiRenderer 	= require(GLOBAL._hadiEngine.path.styleguide.hadi + '/renderer');
 hadiRenderer.registerModules(["a"]);
 hadiRenderer.render();
 */

/*
 var template = {};
 template.source = GLOBAL._hadiEngine.path.styleguide.templates + '/composition/c-overview/view.tpl';
 template.content = fs.readFileSync(template, 'utf-8');

 console.log(file);
 */

/*
 var jsmart 	= require(GLOBAL._hadiEngine.path.styleguide.deliveries + '/jsmart');
 var params = {};
 params.title = 'Page';
 params.composition = '/composition/c-overview/view.tpl';
 var renderdTemplate = jsmart.renderTemplate(app, "./pages/p-default/view.tpl", params);
 response.send(renderdTemplate);
 */
