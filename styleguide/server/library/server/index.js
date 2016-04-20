/**
 * Requirements
 */
var compress 		= require('compression');
var express 		= require('express');

/**
 * Configures the application server
 */
function configure()
{
	//Create server
	var app = express();
	app.use(compress());

	// Static files
	require(hadiEngine.path.styleguide.deliveries + '/static.js')(app);

	// Show all components in htdocs/app
	require(hadiEngine.path.styleguide.views + '/components.js')(app);

	// Doku files for the doku.html files
	require(hadiEngine.path.styleguide.views + '/detail.js')(app);

	// Default Page
	require(hadiEngine.path.styleguide.views + '/page.js')(app);

	//Start express
	var server = app.listen(hadiEngine.server.port, function ()
	{
		var host = server.address().address;
		var port = server.address().port;
		console.log('Listening at http://localhost:%s', port);
	});
}

module.exports = configure;