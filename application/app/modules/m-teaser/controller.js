define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/modules/m-teaser";

	return {
		renderer: require('renderer'),
		name: 'm-teaser',
		defaultModel: path + "/models/default.json",
		defaultTemplate: path + "/view.tpl",
		root: '.m-teaser',
		initialize: function() {
		},
		bind: function(){
		}
	};
});
