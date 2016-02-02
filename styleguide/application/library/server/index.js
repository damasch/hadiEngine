

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
		//console.log(configuration.path.doku + '/templates.js');
		require(configuration.path.doku + '/templates.js')(app, configuration);

		//Start express
		var server = app.listen(configuration.server.port, function ()
		{
			var host = server.address().address;
			var port = server.address().port;
			console.log('Listening at http://localhost:%s', port);
		});
	}

	module.exports = configure;