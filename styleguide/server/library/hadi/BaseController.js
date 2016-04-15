"use strict"
var fs 				= require('fs');
var jsmart 			= require('jsmart');

class BaseController
{
	constructor (dir)
	{
		var tpath = dir.split("/");
		this.dir = dir;
		this.name = tpath[tpath.length - 1];
		this.template = dir + "/view.tpl";
		this.model = dir + "/model.json";
		this.data = fs.readFileSync(this.model);
        input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
		console.log(this.data.name);
		this.content = fs.readFileSync(this.template);
		this.title = "default title";
		this.iniJSmart();
	}

	render(data)
	{
		this.data = data;
		var compiledTemplate = new jSmart(this.content);
		var document = compiledTemplate.fetch(this.data);
		return document;
	}

	iniJSmart()
	{
		jSmart.prototype.getTemplate = function(name)
		{
			var tplPath = getTemplatePath(name);
			var tpl = renderTemplate(app, tplPath, {});
			return tpl;
		}
	}
}

module.exports = BaseController;