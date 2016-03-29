
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
	templateN.style.css = null;
	templateN.style._scss = null;
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


	if(fs.existsSync(templateN.directory + "/style.css"))
	{
		templateN.style.css = templateN.directory + "/_style.css";
	}

	if(fs.existsSync(templateN.directory + "/_style.scss"))
	{
		templateN.style._scss = templateN.directory + "/_style.scss";
	}

	if(fs.existsSync(templateN.directory + "/style.scss"))
	{
		templateN.style.scss = templateN.directory + "/style.scss";
	}

	templateN.dokumentation = "/" + scope + "/" + template + "/doku.html";

	templateN.modelsPath = templateN.directory + "/models";
	_.each(fs.readdirSync(path.resolve(templateN.directory, "models")), function(model)
	{
		tasks.push(function (cb)
		{
			templateN.models.push(model);
			//var templateDir = path.resolve(scopeDir, template);
			//var template;
			//result.scopes[scope].push(template);
			//result.scopes[scope].push(templateParser.readTemplateDir(configuration, template, scope, scopeDir));
			//result.scopes[scope][template] = templateParser.readTemplateDir(configuration, template, scope, scopeDir);
			//result.scopes[scope][template]
			cb();
		});
	});
	return templateN;
}


/**
 * Public api
 */
module.exports =  { readTemplateDir : readTemplateDir };
