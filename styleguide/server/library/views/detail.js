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

function getComponent(request)
{
    //console.log(hadiEngine.path.styleguide.hadi + '/Component.js');
    let componentClass = require(hadiEngine.path.styleguide.hadi + '/Component.js');
    let component = new componentClass(request.path);
    console.log(component);
    /*
	var tasks = [];
	var path = request.path.split('/');
	var scope = path[1];
	var component = path[2];
	var scopeDir = hadiEngine.path.htdocs.app + "/" + scope;
	var componentR = null;

	tasks.push(function (cb)
	{
		var componentParser = require(hadiEngine.path.styleguide.deliveries + '/component');
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
	*/
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
            getComponent(request);
		    /*
			getComponent(request, function(error, result)
			{
				if(!error)
				{
                    let rendererClass = require(hadiEngine.path.styleguide.hadi + '/Renderer.js');
                    let renderer = new rendererClass(
                        '/compositions/c-detail/controller.js',
                        '/pages/p-default/controller.js',
                        hadiEngine.path.styleguide.templates);

                    renderer.registerTemplates([
                        hadiEngine.path.styleguide.templates + "/modules/m-detail/controller.js",
                        hadiEngine.path.styleguide.templates + "/modules/m-navigation/controller.js",
                    ]);

                    var data = {
                        title: "Page"
                    };
                    var result = renderer.render();
                    response.send("detail");
				}
				next();
			});
			*/
            next();
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
