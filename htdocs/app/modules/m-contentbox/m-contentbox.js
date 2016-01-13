define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/modules/m-contentbox";

	return {
		renderer: require('renderer'),
		name: 'm-contentbox',
		defaultModel: path + "/models/m-contentbox--default.json",
		defaultTemplate: path + "/m-contentbox.tpl",
		root: '.m-contentbox',
		initialize: function() {
		},
		bind: function(){
		}
	};
});
