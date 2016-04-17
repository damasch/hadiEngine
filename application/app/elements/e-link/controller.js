define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/elements/e-link";

	return {
		renderer: require('renderer'),
		defaultModel: path + "/models/default.json",
		defaultTemplate: path + "/view.tpl",
		name: 'e-link',
		root: '.e-link',
		initialize: function() {
		},
		bind: function(){
		}
	};
});
