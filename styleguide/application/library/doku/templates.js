
	/**
	 * Requirements
	 */
	var fs = require('fs');
	var path = require('path');
	var S = require('string');
	//var urls = require('../../utils/urls.js');

	/**
	 * Configures a dynamic template rendering handler
	 */
	function configure(app, configuration)
	{
		//Serve templates
		app.all('/', function (request, response, next)
		{
			var dir = path.resolve(configuration.path.app);
			var fs = require('fs');

			var text = "";
			text += "request Path " + request.path + "<br>";
			text += dir + "<br>";

			fs.readdirSync(dir, function(err, list){
				list.forEach(function(file){
					text += path.resolve(configuration.path.app, file) + "<br>";
				});
			});
			response.send(text);
			//Check if it is template
			/*
			if (S(request.path).endsWith('.j2') && fs.existsSync(configuration.path.templates + request.path))
			{
				logger.info('Serving template ' + configuration.path.templates + request.path);
				var type = urls.parse(request.path, 'full');
				var template = fs.readFileSync(configuration.path.templates + request.path, { encoding : 'utf8' });
				var html = configuration.nunjucks.renderString(template, { location: type });
				response.send(html);
				return;
			}
			*/
			//Nope
			next();
		});
	};

	/**
	 * Public api
	 */
	module.exports = configure;
