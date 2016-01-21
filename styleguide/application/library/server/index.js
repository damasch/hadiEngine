

	/**
	 * Requirements
	 */
	var compress = require('compression');
	var express = require('express');

	/**
	 * Configures the application server
	 */
	function configure(configuration)
	{
		//Create server
		var app = express();
		app.use(compress());

		require(configuration.path.doku + '/templates.js')(app, configuration);

		//Start express
		var server = app.listen(configuration.server.port, function ()
		{
			var host = server.address().address;
			var port = server.address().port;
			console.log('Listening at http://%s:%s', host, port);
		});
	}

	module.exports = configure;