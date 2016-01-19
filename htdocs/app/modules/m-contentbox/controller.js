define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/modules/m-contentbox";

	return {
		renderer: require('renderer'),
		name: 'm-contentbox',
		defaultModel: path + "/models/default.json",
		defaultTemplate: path + "/view.tpl",
		root: '.m-contentbox',
		initialize: function() {
		},
		bind: function(){
		}
	};
});
