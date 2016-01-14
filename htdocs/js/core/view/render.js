define(['require', '$', 'smarty'], function (require, smarty) {

	var path = appBaseUrl;

	return {
		tags: [], // list of tags to resolve
		modules: [], // list of registerd modules
		iniRoot: null, // initial root selector
		elements: [], // list of elements aka stack trace
		selector: '', // selector after registration
		inlineVars: true, // allow attributes like <m-module headline="..."> if not in default model
		/**
		 * @method fetch the data model into the template
		 * @param string templateContext raw data of template
		 * @param string modelContext raw data of model
		 * @return string html markup
		 */
		templateEngineFetch: function(templateContext, modelContext){
			// create new Template Engine
			var templateEngine = new jSmart(templateContext);

			// render/fetch new markup
			var markup = templateEngine.fetch(modelContext);
			return markup;
		},
		/**
		 * @method fetch the element
		 * @param jquery element
		 * @returns deferred
		 */
		fetch: function(element) {
			var deferred = $.Deferred();
			var renderer = this;

			// get data.template and data.model
			var data = renderer.renderSetup(element);

			// load template an Model
			if(data.template && data.model)
			{
				// load Template
				renderer.loadFile(data.template, 'text').success(function(templateContext, status, jqXHR)
				{
					// check raw data
					// inline json data
					if(data.rawdata)
					{
						// overwirte attributes
						data.rawdata = renderer.renderOverwrite(element, data.rawdata);
						var markup = renderer.templateEngineFetch(templateContext, data.rawdata);
						deferred.resolve(markup);
					} else
					{
						// load model from data.model url
						renderer.loadFile(data.model, 'json').success(function(modelContext, status, jqXHR)
						{
							// overwirte attributes
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
		/**
		 * @method returns the data resource for models and templates
		 * @param jquery element
		 * @param string resource model or template
		 * @returns {undefined} or undefined
		 */
		getResourcePath: function(element, resource) {
			var source = $(element).data(resource);
			var result = undefined;
			if (source && source != "")
			{
				result = path + source;
			}
			return result;
		},
		/**
		 * @method load file by ajax
		 * @param string file url
		 * @param string contenxt datatype like json for models or text for templates
		 * @returns deferred
		 */
		loadFile: function(file, contenxt){
			return $.ajax({
				url : file,
				cache: false,
				type: "POST",
				data : {},
				dataType: contenxt
			});
		},
		/**
		 * @method override the values of the data model
		 * @param jquery element
		 * @param json data
		 * @returns data overwritten
		 */
		renderOverwrite: function(element, data){
			var renderer = this;
			$.each($(element)[0].attributes, function(index, attribute){
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
			return data;
		},
		/**
		 * @method render setup for an jquery element. set up the default template and model
		 * @param jquery element
		 * @returns {{model: boolean, template: boolean, rawdata: boolean}}
		 */
		renderSetup: function(element){
			var renderer = this;
			var module = false;
			var result = {
				model: false,
				template: false,
				rawdata: false
			};
			// register module if module not defined
			if(!$(element).data("module"))
			{
				module = renderer.getRegisterdModuleByName($(element).prop("tagName").toLocaleLowerCase());
				this.initializeModule(module);
			}

			// set up the properties
			result.template = renderer.getResourcePath(element, 'template')||'/js/core/template/empty.tpl';
			result.model = renderer.getResourcePath(element, 'model')||'/js/core/model/empty.json';
			result.rawdata = $(element).data('rawdata');

			return result;
		},
		/**
		 * @method initial render method
		 * @returns {*}
		 */
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
		/**
		 * @method render Dom
		 * @param jquery element
		 * @returns deferred
		 */
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
				// find direct child
				$(element).children(renderer.selector).each(function(index, child)
				{
					// call recursive
					renderer.renderRecursive(child).then(function()
					{
						deferred.resolve();
					});
				});
			// traverse the deeper dom
			} else if($(element).find(renderer.selector).length > 0)
			{
				// traverse the next dom child
				$(element).children().each(function(index, child)
				{
					// call recursive
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
					// check the renderd result for custom tags
					// traverse the dom
					if($(element).children(renderer.selector).length > 0)
					{
						// find direct child
						$(element).children(renderer.selector).each(function(index, child)
						{
							// call recursive
							renderer.renderRecursive(child).then(function()
							{
								deferred.resolve();
							});
						});
					// traverse the deeper dom
					} else if($(element).find(renderer.selector).length > 0)
					{
						// traverse the next dom child
						$(element).children().each(function(index, child)
						{
							// call recursive
							renderer.renderRecursive(child).then(function(){
								deferred.resolve();
							});
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

					// remove the custom tag name
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
