
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
	var tasks = [];

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

	if(fs.existsSync(templateN.directory + "/info.md"))
	{
		templateN.info = templateN.directory + "/info.md";
	}

	if(fs.existsSync(templateN.directory + "/controller.js"))
	{
		templateN.controller = templateN.directory + "/controller.js";
	}

	if(fs.existsSync(templateN.directory + "/view.tpl"))
	{
		templateN.view = templateN.directory + "/view.tpl";
	}

	if(fs.existsSync(templateN.directory + "/style.scss"))
	{
		templateN.style.scss = templateN.directory + "/style.scss";
		templateN.style.modifier = "";
		console.log("read SCSS "  + templateN.style.scss);
		tasks.push(function (cb)
		{
			fs.readFile(templateN.style.scss, 'utf8', function (err,text) {

				//templateN.style.modifier = data;
				text = text.replace(/(?:\r\n|\r|\n)/g, '');
				var res = text.match(/(?:--)([a-z0-9]*)(?:())/g);
				var modifier = [];
				if(res)
				{
					for(var i = 0; i < res.length; i++)
					{
						if(modifier.indexOf(res[i]) < 0)
						{
							modifier.push(res[i]);
						}
					}
				}
				templateN.style.modifier = modifier;
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
