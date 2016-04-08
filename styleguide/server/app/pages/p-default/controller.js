"use strict"
let BaseController = require(GLOBAL._hadiEngine.path.styleguide.hadi + '/engine/BaseController.js');

class Controller extends BaseController
{
	constructor ()
	{
		super(__dirname);
		console.log("Controller - p-default c-tor");
	}
}

module.exports = Controller;
