"use strict"
var fs = require('fs');

class BaseController
{
	constructor (dir)
	{
		this.template = dir + "/view.tpl";
		this.content = fs.readFileSync(this.template);
	}
}

module.exports = BaseController;