"use strict"
var fs 				= require('fs');
var _ 				= require('lodash');
var cheerio 		= require('cheerio');

class Renderer
{
	constructor(template)
	{
        this.pageTemplate = template;
		this.modules = [];
        this.inlineVars = true;
		this.iniRoot = "*";
	}

	registerTemplates(modules)
	{
		let renderer = this;
		let paths = [];
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
		name = name.toLowerCase();
		for(var i = 0; i < renderer.modules.length; i++)
		{
			if (renderer.modules[i].name.toLowerCase() == name)
			{
				return renderer.modules[i];
			}
		}
		return;
	}

	render(data)
	{
		let renderer = this;
		renderer.$ = cheerio.load(this.pageTemplate.render(data));
        this.renderRecursive(renderer.$(renderer.iniRoot).first());
		return renderer.$.html();
	}

	renderRecursive(element)
	{

		// define renderer for nesting callbacks
		var renderer = this;
		var $ = renderer.$;

		// Set element default = body
		if(!element)
		{
			element = this.iniRoot;
		}

		// traverse the dom
		if($(element).children(renderer.selector).length > 0)
		{
			// find direct child
			$(element).children(renderer.selector).each(function(index, child)
			{
				// call recursive
				renderer.renderRecursive(child);
				return;
			});
			// traverse the deeper dom
		} else if($(element).find(renderer.selector).length > 0)
		{
			// traverse the next dom child
			$(element).children().each(function(index, child)
			{
				// call recursive
				renderer.renderRecursive(child);
				return;
			});
		}

		// check if child has an registerModulesd tagname
		if(renderer.selector.indexOf($(element).prop("tagName").toLowerCase()) >= 0)
		{
			renderer.renderMarkup(element)

			// check the renderd result for custom tags
			// traverse the dom

			if($(element).children(renderer.selector).length > 0)
			{
				// find direct child
				$(element).children(renderer.selector).each(function(index, child)
				{
					// call recursive
					renderer.renderRecursive(child);
					return;
				});
				// traverse the deeper dom
			} else if($(element).find(renderer.selector).length > 0)
			{
				// traverse the next dom child
				$(element).children().each(function(index, child)
				{
					// call recursive
					renderer.renderRecursive(child);
					return;
				});
			}

			// add classes to the root node
			if($(element).attr('class') && $(element).data('module'))
			{
				var $root = $(element).find($(element).data('module').root);
				var elementClass = $(element).attr('class');
				$root.addClass(elementClass);
			}

			// add styles to the root node
			if($(element).attr('style') && $(element).data('module'))
			{
				var $root = $(element).find($(element).data('module').root);
				var elementStyle = $(element).attr('style')?$(element).attr('style'):"";
				var rootStyle = $root.attr('style')?$root.attr('style'):"";
				$root.attr('style', rootStyle + " " + elementStyle);
			}

            $(element).parent().find(element).replaceWith($(element).html());
		}

		return;
	}

	renderMarkup(element)
	{
		var renderer = this;
		//var $ = renderer.$;

		// render template with model
		var markup = renderer.fetch(element);
		// set the markup in dem Node

        var $ = cheerio.load(markup);
		var oldMarkup = $(element).html();
        $.root().find("content").replaceWith(oldMarkup);

		$(element).html($.root().html());//.find("content").replaceWith(oldMarkup);

		return;
	}
	fetch(element)
	{
		var renderer = this;
		var $ = renderer.$;
		var tpl = renderer.getRegisterdModuleByName($(element).prop("tagName"));
		var data = renderer.renderOverwrite(element, tpl.properties);
		return tpl.render(data);
	}

	renderOverwrite(element, data)
	{
		var renderer = this;
		var $ = renderer.$;
        var data = null;

        if($(element)[0].attribs){
            data = this.getAttributes(element);
            _.each(data, function(attribute, index){
                if(renderer.inlineVars)
                {
                    data[attribute.name] = attribute.value;
                } else
                {
                    if(data.hasOwnProperty(attribute.name))
                    {
                        data[attribute.name] = attribute.value;
                    }
                }
            });

            $(element).find("data").each(function (index, obj) {
                if($(obj).prop("tagName").toLowerCase() == "data") {
                    var name = $(obj)[0].attribs["name"];
                    var value = JSON.parse($(obj).text());
                    //var value = JSON.parse($(obj).text())
                    $(obj).remove();
                    if(value) {
                        if(name) {
                            data[name] = value;
                        } else
                        {
                            data = value;
                        }
                    }
                }
            });
        }
        return data;
	}

	getAttributes(element)
    {
        var renderer = this;
        var $ = renderer.$;
        var data = [];
        _.each($(element)[0].attribs, function(index, attribute){
            data.push({
                name: attribute,
                value: $(element)[0].attribs[attribute]
            })
        });
        return data;
    }
}

module.exports = Renderer;
