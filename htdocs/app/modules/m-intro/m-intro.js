define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/modules/m-intro";

	return {
		renderer: require('renderer'),
		name: 'm-intro',
		defaultModel: path + "/models/m-intro--default.json",
		defaultTemplate: path + "/m-intro.tpl",
		root: '.m-intro',
		headline: '.m-intro-headline',
		pagerLeft: '.m-intro-left',
		pagerRight: '.m-intro-right',
		initialize: function() {
		},
		bind: function(){

			var module = this;
			$(module.root).each(function(index, element){
				$(element).find(module.headline).on('click', function(event){
					module.clickHeadline(this, event);
				});
				$(element).find(module.pagerLeft).on('click', function(event){
					module.clickLeft(this, event);
				});
				$(element).find(module.pagerRight).on('click', function(event){
					module.clickRight(this, event);
				});
			});
		},
		clickHeadline: function(element, event){
			alert("Module " + $(element).text().trim());
		},
		clickLeft: function(element, event){
			alert("Pager left " + $(element).text().trim());
		},
		clickRight: function(element, event){
			alert("Pager right " + $(element).text().trim());
		}
	};
});
