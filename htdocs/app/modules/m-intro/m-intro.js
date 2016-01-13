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
		initialize: function() {
		},
		bind: function(){

			var module = this;
			$(module.root).each(function(index, element){
				$(element).find(module.headline).on('click', module.clickHeadline);

				$(element).find(module.pagerLeft).on('click', module.clickLeft);
			});
		},
		clickHeadline: function(event){
			alert("Module " + $(this).text().trim());
		},
		clickLeft: function(event){
			alert("Pager left" + $(this).text().trim());
		}
	};
});
