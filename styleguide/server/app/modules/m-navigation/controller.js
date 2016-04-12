"use strict"
let BaseController = require(GLOBAL._hadiEngine.path.styleguide.hadi + '/BaseController.js');

class Controller extends BaseController
{
	constructor (data)
	{
		super(__dirname, data);
	}
}

module.exports = Controller;
