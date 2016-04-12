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

		_.each(paths, function(tpath)
		{
			if(fs.existsSync(tpath))
			{
				let controllerClass = require(tpath);
				let controller = new controllerClass({});
				renderer.modules.push(controller);
			}
			else
			{
				throw new Error("File not found: \t" + compPath);
			}
		});
		let $  = cheerio.load(data.composition);
		//this.selector = this.modules.join(', ');
		this.selector = "";
	}

	render(data)
	{
		let renderer = this;
		data.composition = this.composition.render();

		let $  = cheerio.load(data.composition);
		/*
		console.log(this.selector);

		console.log(renderer.modules);

		$(this.selector).each(function(index, element)
		{
			console.log(index);
		});
		*/
		return this.pageTemplate.render(data);
	}

	renderRecursive(element)
	{

	}
}

module.exports = Renderer;
