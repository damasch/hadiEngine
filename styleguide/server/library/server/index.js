

	/**
	 * Requirements
	 */
	var compress 		= require('compression');
	var express 		= require('express');

	/**
	 * Configures the application server
	 */
	function configure(configuration)
	{
		//Create server
		var app = express();
		app.use(compress());


		//Setup nSmarty
		require(configuration.path.setup + '/nsmarty.js')(app, configuration);

		//Static files
		require(configuration.path.deliveries + '/static.js')(app, configuration);

		//console.log(configuration.path.doku + '/components.js');
		require(configuration.path.deliveries + '/components.js')(app, configuration);

		//Doku files
		require(configuration.path.deliveries + '/doku.js')(app, configuration);

		//Start express
		var server = app.listen(configuration.server.port, function ()
		{
			var host = server.address().address;
			var port = server.address().port;
			console.log('Listening at http://localhost:%s', port);
		});
	}

	module.exports = configure;