
/**
 * Requirements
 */
var fs = require('fs');
var path = require('path');
var S = require('string');
var _ = require('lodash');
var async = require('async');

function readTemplateDir(configuration, template, scope, scopeDir, callback)
{
	// task callback list
	var tasks = [];
	console.log("\tread Template:\t" + template);

	// create new template object
	var templateN = {};
	templateN.name = template;
	templateN.directory = path.resolve(scopeDir, template);
	templateN.scope = scope;

	templateN.info = null;

	templateN.controller = null;

	templateN.view = null;

	templateN.models = [];

	templateN.style = {};
	templateN.style.scss = null;

	// get markdown content
	if(fs.existsSync(templateN.directory + "/info.md"))
	{
		templateN.info = templateN.directory + "/info.md";
	}

	// get controller js
	if(fs.existsSync(templateN.directory + "/controller.js"))
	{
		templateN.controller = templateN.directory + "/controller.js";
	}

	// get view js
	if(fs.existsSync(templateN.directory + "/view.tpl"))
	{
		templateN.view = templateN.directory + "/view.tpl";
	}

	// get style scss
	if(fs.existsSync(templateN.directory + "/style.scss"))
	{
		templateN.style.scss = templateN.directory + "/style.scss";
		templateN.style.modifier = "";

		tasks.push(function (cb)
		{
			fs.readFile(templateN.style.scss, 'utf8', function (err,text) {

				//templateN.style.modifier = data;
				text = text.replace(/(?:\r\n|\r|\n)/g, '');
				var res = text.match(/(?:--)([a-z0-9]*)(?:())/g);
				var modifiers = [];
				if(res)
				{
					for(var i = 0; i < res.length; i++)
					{
						var modifier = res[i].replace("--", "");
						if(modifiers.indexOf(modifier) < 0)
						{
							modifiers.push(modifier);
						}
					}
				}
				templateN.style.modifier = modifiers;
				cb();
			});
			//console.log(data);
		});
	}

	templateN.dokumentation = "/" + scope + "/" + template + "/doku.html";

	templateN.modelsPath = templateN.directory + "/models";
	_.each(fs.readdirSync(path.resolve(templateN.directory, "models")), function(model)
	{
		tasks.push(function (cb)
		{
			templateN.models.push(model);
			cb();
		});
	});

	//callback after stack
	async.series(tasks, function(error)
	{
		callback(error, templateN);
	});
}


/**
 * Public api
 */
module.exports =  { readTemplateDir : readTemplateDir };
