define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/elements/e-link";

	return {
		renderer: require('renderer'),
		defaultModel: path + "/models/e-link--default.json",
		defaultTemplate: path + "/e-link.tpl",
		name: 'e-link',
		root: '.e-link',
		initialize: function() {
		},
		bind: function(){
		}
	};
});
