"use strict"
var fs 				= require('fs');
var jsmart 			= require('jsmart');

class BaseController
{
    constructor (dir)
    {
        var tpath = dir.split("/");
        this.dir = dir;
        this.name = tpath[tpath.length - 1];
        this.template = dir + "/view.tpl";
        this.model = dir + "/model.json";
        this.properties = JSON.parse(fs.readFileSync(this.model));
        this.content = fs.readFileSync(this.template);
        this.title = "default title";
        this.iniJSmart();
    }

    render(data)
    {
        this.data = data;
        var compiledTemplate = new jSmart(this.content);
        var document = compiledTemplate.fetch(this.data);
        return document;
    }

    iniJSmart()
    {
        jSmart.prototype.getTemplate = function(name)
        {
            var tplPath = getTemplatePath(name);
            var tpl = renderTemplate(app, tplPath, {});
            return tpl;
        };

        jSmart.prototype.registerPlugin(
            'modifier',
            'json_encode',
            function(o)
            {
                var s = JSON.stringify(o);
                return s;
            }
        );
    }
}

module.exports = BaseController;