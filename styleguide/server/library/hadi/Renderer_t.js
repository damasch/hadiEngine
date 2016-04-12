"use strict"

class Renderer_t
{
	constructor(callback)
	{
		this.tags = [];
		this.modules = [];
		this.iniRoot = null;
		this.elements = [];
		this.selector = '';
		this.inlineVars = true;
	}

	templateEngineFetch(templateContext, modelContext)
	{
	}

	fetch(element)
	{
	}

	getResourcePath(element, resource)
	{
	}

	loadFile(file, contenxt)
	{
	}

	renderOverwrite(element, data)
	{
	}

	renderSetup()
	{
	}

	render()
	{
		console.log(this.modules);
	}

	renderRecursive(element)
	{
	}

	renderMarkup(element)
	{
	}

	registerModules(modules)
	{
		if(typeof(modules) == "string")
		{
			this.modules.push(modules);
		}
		else
		{
			this.modules = this.modules.concat(modules);
		}
	}

	initializeModule(module)
	{
	}

	getRegisterdModuleByName(name)
	{
	}
}

module.exports = Renderer;
