
/**
 * Requirements
 */
var fs = require('fs');
var path = require('path');
var _ = require('lodash');


/**
 * Sends the given file if it exists
 */
function trySendigFile(filename, response, configuration)
{
	if (!fs.existsSync(filename))
	{
		return false;
	}

	var delay = Math.round(configuration.server.delay.statics.min + (configuration.server.delay.statics.max - configuration.server.delay.statics.min) * Math.random());
	_.delay(function()
	{
		response.sendFile(filename);
	}, delay);
	return true;
}


/**
 * Configures a static file handler on the express server
 */
function configure(app, configuration)
{
	app.all('*', function (request, response, next)
	{
		//Check internal file
		if (trySendigFile(path.resolve(configuration.path.server + request.path),
				response, configuration))
		{
			return;
		}
		next();
	});

};

/**
 * Public api
 */
module.exports = configure;