
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


function getTemplatePath(template)
{
	if(fs.existsSync(template))
	{
		return template;
	}

	if(GLOBAL._hadiEngine)
	{
		if(fs.existsSync(GLOBAL._hadiEngine.path.styleguide.templates + template))
		{
			template = GLOBAL._hadiEngine.path.styleguide.templates + template;
			return template;
		}
		if(fs.existsSync(GLOBAL._hadiEngine.path.styleguide.templates + "/" + template))
		{
			template = GLOBAL._hadiEngine.path.styleguide.templates + "/" + template;
			return template;
		}
	}
	return;
}

/**
 * Configures a dynamic template rendering handler
 */
function renderTemplate(app, template, object)
{
	jSmart.prototype.getTemplate = function(name)
	{
		var tplPath = getTemplatePath(name);
		var tpl = renderTemplate(app, tplPath, {});
		return tpl;
	}

	//var tempalte = template;
	var templatePath = getTemplatePath(template);

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
module.exports = { renderTemplate : renderTemplate };