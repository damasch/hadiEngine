"use strict"
let BaseController = require(hadiEngine.path.styleguide.hadi + '/BaseController.js');

class Controller extends BaseController
{
	constructor (data)
	{
		super(__dirname, data);
		this.title = "Overview";
	}
}

module.exports = Controller;
