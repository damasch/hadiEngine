
var nsmarty 		= require('nsmarty');

nSmarty.prototype.registerPlugin('modifier', 'var_dump', function(o)
{
	return JSON.stringify(o, null, 4);
});

/**
 * Configures a dynamic template rendering handler
 */
function configure(app, configuration)
{
	nsmarty.tpl_path = configuration.path.templates;
};


module.exports = configure;