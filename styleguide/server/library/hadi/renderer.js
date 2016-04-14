"use strict"
var fs 				= require('fs');
var _ 				= require('lodash');
var cheerio 		= require('cheerio');

class Renderer
{
	constructor(composition, pageTemplate, scope)
	{
		let tplPath = scope + pageTemplate;
		this.modules = [];

		if(pageTemplate && fs.existsSync(tplPath))
		{
			let pageTemplateClass = require(tplPath);
			this.pageTemplate = new pageTemplateClass();
		}
		else
		{
			throw new Error("File not found: \t" + tplPath);
		}
		var compPath = scope + composition;
		if(composition && fs.existsSync(compPath))
		{
			let compositionR = require(compPath);
			this.composition = new compositionR();
		}
		else
		{
			throw new Error("File not found: \t" + compPath);
		}
	}

	registerTemplates(modules)
	{
		let renderer = this;
		let paths = []
		if(modules)
		{
			if(typeof(modules) == "string")
			{
				paths.push(modules);
			}
			else
			{
				paths = modules;
			}
		}
		let select = [];
		for(var i = 0; i < paths.length; i++)
		{
			if(fs.existsSync(paths[i]))
			{
				let controllerClass = require(paths[i]);
				let controller = new controllerClass({});
				renderer.modules.push(controller);
				select.push(controller.name);
			}
			else
			{
				throw new Error("File not found: \t" + paths[i]);
			}
		}

		this.selector = select.join(', ');
	}

	getRegisterdModuleByName(name)
	{
		let renderer = this;
		for(var i = 0; i < renderer.modules.length; i++)
		{
			if (renderer.modules[i].name == name)
			{
				return renderer.modules[i];
			}
		}
		return;
	}

	render()
	{
		let renderer = this;
		var data = {};
		data.title = this.composition.title;
		data.composition = this.composition.render();
		let $  = cheerio.load(data.composition);
		this.renderRecursive($);
		data.composition = $.html();

		return this.pageTemplate.render(data);
	}

	renderRecursive($)
	{
		let renderer = this;
		$("* > " + this.selector).each(function(index, element)
		{
			//console.log(index, element.name);
			let module = renderer.getRegisterdModuleByName(element.name);
			//console.log(module.render({}));
			$(element).html(module.render({}));
		});
	}
}

module.exports = Renderer;
