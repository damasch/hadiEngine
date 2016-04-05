

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

		// Setup nSmarty
		require(configuration.path.styleguide.setup + '/nsmarty.js')(app, configuration);

		// Static files
		require(configuration.path.styleguide.deliveries + '/static.js')(app, configuration);

		// Show all components in htdocs/app
		require(configuration.path.styleguide.deliveries + '/components.js')(app, configuration);

		// Doku files for the doku.html files
		require(configuration.path.styleguide.deliveries + '/doku.js')(app, configuration);

		//Start express
		var server = app.listen(configuration.server.port, function ()
		{
			var host = server.address().address;
			var port = server.address().port;
			console.log('Listening at http://localhost:%s', port);
		});
	}

	module.exports = configure;