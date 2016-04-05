
/**
 * Requirements
 */
var fs 				= require('fs');
var path 			= require('path');
var S 				= require('string');
var util 			= require('util');
var _ 				= require('lodash');
var async 			= require('async');
var jsmart 			= require('jsmart');


function getTemplatePath(configuration, template)
{
	if(fs.existsSync(template))
	{
		return template;
	}

	if(configuration)
	{
		if(fs.existsSync(configuration.path.styleguide.templates + template))
		{
			template = configuration.path.styleguide.templates + template;
			return template;
		}
		if(fs.existsSync(configuration.path.styleguide.templates + "/" + template))
		{
			template = configuration.path.styleguide.templates + "/" + template;
			return template;
		}
	}
	return;
}

/**
 * Configures a dynamic template rendering handler
 */
function renderTemplate(app, configuration, template, object)
{
	//var tempalte = template;
	var templatePath = getTemplatePath(configuration, template);

	if(templatePath)
	{
		var tpl = fs.readFileSync(templatePath, {encoding: 'utf-8'});
		var compiledTemplate = new jSmart(tpl);
		return compiledTemplate.fetch(object);
	}
};

/**
 * Public api
 */
module.exports = { renderTemplate : renderTemplate };;