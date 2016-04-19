"use strict"
/**
 * Requirements
 */
var fs = require('fs');
var path = require('path');
var S = require('string');
var _ = require('lodash');
var async = require('async');

class Component {
    constructor (dir) {
        this.directory = null; // path.resolve(scopeDir, component);
        this.name = null; //component;
        this.scope = null; // scope;

        this.info = null;
        this.controller = null;
        this.view = null;
        this.models = [];

        this.style = {};
        this.style.scss = null;
        this.style.modifier = [];
        this.style.properties = [];
        this.loadComponent(dir);
        this.loadPattern();
    }

    loadComponent(dir){
        var dir = dir.split('/');
        this.scope = dir[1];
        this.name = dir[2];
        this.directory = path.resolve(GLOBAL._hadiEngine.path.htdocs.app, this.scope);
        this.directory = path.resolve(this.directory, this.name);
    }

    loadPattern() {
        // get markdown content
        if(fs.existsSync(this.directory + "/info.md"))
        {
            this.info = this.directory + "/info.md";
        }

        // get controller js
        if(fs.existsSync(this.directory + "/controller.js"))
        {
            this.controller = this.directory + "/controller.js";
        }

        // get view js
        if(fs.existsSync(this.directory + "/view.tpl"))
        {
            this.view = this.directory + "/view.tpl";
        }

        this.modelsPath = this.directory + "/models";
        var models = [];
        _.each(fs.readdirSync(path.resolve(this.directory, "models")), function(model)
        {
            models.push(model);
        });
    }
}

module.exports = Component;