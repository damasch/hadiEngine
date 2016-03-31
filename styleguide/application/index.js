
var nodemon = require('nodemon');
var path = require('path');

var configuration = require('./setup/configuration.js');


console.log("*********************************");
console.log("*******    STYLEGUIDDE    *******");
console.log("*********************************");

nodemon(
{
	script: configuration.server.path,
	watch: [__dirname, configuration.path.htdocs],
	ext: 'html js json j2 tpl'
});



