/**
 * Requirements
 */
var fs = require('fs');
var path = require('path');
var _ = require('lodash');


/**
 * Sends the given file if it exists
 */
function trySendigFile(filename, response)
{
	if (!fs.existsSync(filename))
	{
		return false;
	}

	var delay = Math.round(
		GLOBAL._hadiEngine.server.delay.statics.min +
		(GLOBAL._hadiEngine.server.delay.statics.max -
		GLOBAL._hadiEngine.server.delay.statics.min) *
		Math.random());

	_.delay(function()
	{
		response.sendFile(filename);
	}, delay);
	return true;
}


/**
 * Configures a static file handler on the express server
 */
function configure(app)
{
	app.all('*', function (request, response, next)
	{
		//Check internal file
		if (trySendigFile(path.resolve(GLOBAL._hadiEngine.path.styleguide.server + request.path), response))
		{
			return;
		}
		next();
	});

    app.all('/styleguide/*', function (request, response, next)
    {
        console.log("SCOPE; " + "styleguide");

        var appl = request.path.split('/');
        appl.splice(1,1);
        appl = appl.join('/');

        //Check internal file
        if (trySendigFile(path.resolve(GLOBAL._hadiEngine.path.styleguide.public + appl), response))
        {
            return;
        }
        next();
    });
}

/**
 * Public api
 */
module.exports = configure;