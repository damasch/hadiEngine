define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/elements/e-image";

	return {
		renderer: require('renderer'),
		defaultModel: path + "/models/default.json",
		defaultTemplate: path + "/view.tpl",
		name: 'e-image',
		root: '.e-image',
		initialize: function() {
		},
		bind: function(){
		}
	};
});
