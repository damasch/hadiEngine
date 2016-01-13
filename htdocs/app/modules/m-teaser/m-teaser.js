define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/modules/m-teaser";

	return {
		renderer: require('renderer'),
		name: 'm-teaser',
		defaultModel: path + "/models/m-teaser--default.json",
		defaultTemplate: path + "/m-teaser.tpl",
		root: '.m-teaser',
		initialize: function() {
		},
		bind: function(){
		}
	};
});
