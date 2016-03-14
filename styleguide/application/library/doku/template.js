
/**
 * Requirements
 */
var fs = require('fs');
var path = require('path');
var S = require('string');
var _ = require('lodash');
var async = require('async');



function readTemplateDir(configuration, template, scope, scopeDir, callback)
{
	var template = {};
	template.name = template;
	//template.dir = path.resolve(scopeDir, template);
	template.scope = scope;
	return template;
}

/**
 * Public api
 */
module.exports =  { readTemplateDir : readTemplateDir };;
