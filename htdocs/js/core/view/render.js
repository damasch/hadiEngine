define(['require', '$', 'smarty'], function (require, smarty) {

	var path = appBaseUrl;
	
	return {
		tags: [],
		modules: [],
		iniRoot: null,
		indexer: 0,
		elements: [],
		selector: '',
		templateEngineFetch: function(templateContext, modelContext){
			// create new Template Engine
			var templateEngine = new jSmart(templateContext);

			// render/fetch new markup
			var markup = templateEngine.fetch(modelContext);
			return markup;
		},
		fetch: function(element) {
			var deferred = $.Deferred();
			var renderer = this;

			var data = renderer.renderSetup(element);

			// load template an Model
			if(data.template && data.model)
			{
				// load Template
				renderer.loadFile(data.template, 'text').success(function(templateContext, status, jqXHR)
				{
					if(data.rawdata)
					{
						data.rawdata = renderer.renderOverwrite(element, data.rawdata);
						var markup = renderer.templateEngineFetch(templateContext, data.rawdata);
						deferred.resolve(markup);
					} else
					{
						// load model
						renderer.loadFile(data.model, 'json').success(function(modelContext, status, jqXHR)
						{
							modelContext = renderer.renderOverwrite(element, modelContext);
							var markup = renderer.templateEngineFetch(templateContext, modelContext);
							deferred.resolve(markup);
						}).error(function(xhr, ajaxOptions, thrownError)
						{
							console.log("error on model: " + data.model + " " + thrownError, $(element));
						});
					}
				}).error(function(xhr, ajaxOptions, thrownError)
				{
					console.log("error on template: " + data.template + " " + thrownError, $(element));
				});
			}
			return deferred;
		},
		getResourcePath: function(element, resource) {
			var source = $(element).data(resource);
			var result = undefined;
			if (source && source != "")
			{
				result = path + source;
			}
			return result;
		},
		loadFile: function(file, contenxt){
			return $.ajax({
				url : file,
				cache: false,
				type: "POST",
				data : {},
				dataType: contenxt
			});
		},
		renderOverwrite: function(element, data){
			$.each($(element)[0].attributes, function(index, attribute){
				if(data.hasOwnProperty(attribute.name))
				{
					data[attribute.name] = attribute.value;
				}
			});
			return data;
		},
		renderSetup: function(element){
			var renderer = this;
			var module = false;
			var result = {
				model: false,
				template: false,
				rawdata: false
			};
			if(!$(element).data("module"))
			{
				module = renderer.getRegisterdModuleByName($(element).prop("tagName").toLocaleLowerCase());
				this.initializeModule(module);
			}

			result.template = renderer.getResourcePath(element, 'template')||'/js/core/template/empty.tpl';
			result.model = renderer.getResourcePath(element, 'model')||'/js/core/model/empty.json';
			result.rawdata = $(element).data('rawdata');

			return result;
		},
		render: function()
		{
			var renderer = this;
			var deferred = $.Deferred();
			// render dom from Body
			renderer.iniRoot = 'body';
			renderer.renderRecursive(this.iniRoot).then(function()
			{
				renderer.bindModuleHandler();
			});
			return deferred;
		},
		renderRecursive: function(element)
		{
			var deferred = $.Deferred();

			// Set element default = body
			if(!element)
			{
				element = this.iniRoot;
			}

			// define renderer for nesting callbacks
			var renderer = this;

			// traverse the dom
			if($(element).children(renderer.selector).length > 0)
			{
				$(element).children(renderer.selector).each(function(index, child)
				{
					renderer.renderRecursive(child).then(function()
					{
						deferred.resolve();
					});
				});
			} else if($(element).find(renderer.selector).length > 0)
			{
				$(element).children().each(function(index, child)
				{
					renderer.renderRecursive(child).then(function(){
						deferred.resolve();
					});
				});
			}

			// check if child has an registerModulesd tagname
			if(renderer.selector.indexOf($(element).prop("tagName").toLowerCase()) >= 0)
			{

				// add the items for done defer aka callstack
				renderer.elements.push(element);

				renderer.renderMarkup(element).then(function()
				{
					// get the parent
					//var $parent = $(element).parent();
					// remove the custom tag name

					// traverse the dom
					if($(element).children(renderer.selector).length > 0)
					{
						$(element).children(renderer.selector).each(function(index, child)
						{
							renderer.renderRecursive(child).then(function()
							{
								deferred.resolve();
							});
						});
					} else if($(element).find(renderer.selector).length > 0)
					{
						$(element).children().each(function(index, child)
						{
							renderer.renderRecursive(child).then(function(){
								deferred.resolve();
							});
						});
					}
					if($(element).attr('class'))
					{
						if($(element).data('module'))
						{
							var $root = $(element).find($(element).data('module').root);
							var elementClass = $(element).attr('class');
							$root.addClass(elementClass);
						}
					}
					$(element).children().first().unwrap();

					// remove element
					var index = renderer.elements.indexOf(element);
					if(index >= 0)
					{
						renderer.elements.splice(index, 1);
					}
					// if all elements rendert return resolve
					if(renderer.elements.length == 0)
					{
						return deferred.resolve();
					}
				});
			}

			return deferred;
		},
		renderMarkup: function(element)
		{
			var deferred = $.Deferred();
			var renderer = this;

			// render template with model
			renderer.fetch(element)
				.then(function (markup)
				{
					// set the markup in dem Node
					var oldMarkup = $(element).html();
					$(element).html(markup).find("content").replaceWith(oldMarkup);
					return deferred.resolve();
				});
			return deferred;
		},
		bindModuleHandler: function()
		{
			// bindModuleHandler the functions of an module
			$.each(this.modules, function(index, element){
				if(element.bind)
				{
					element.bind();
				}
			});
		},
		registerModules: function(modules)
		{
			// register modules
			var renderer = this;
			$.each(modules, function(index, element)
			{
				renderer.initializeModule(element);
				renderer.modules.push(element);
			});

			// define names for rendering
			var names = [];
			$.each(this.modules, function(index, element)
			{
				names.push(element.name);
			});

			// create jquery selector
			this.selector = names.join(", ");

		},
		initializeModule: function(module)
		{
			// setup defaults for dom modules

			$(module.name).each(function(index, element)
			{

				// set module
				$(element).data('module', module);

				// check data attribute model
				if(!$(element).data('model'))
				{
					$(element).data('model', module.defaultModel);
				}
				// check data attribute template
				if(!$(element).data('template'))
				{
					$(element).data('template', module.defaultTemplate);
				}
			});
		},
		getRegisterdModuleByName: function(name)
		{
			var result = null;
			$.each(this.modules, function(index, element)
			{
				if (element.name == name)
				{
					result = element;
				}
			});
			return result;
		}
	};
});
