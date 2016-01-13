define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/elements/e-image";

	return {
		renderer: require('renderer'),
		defaultModel: path + "/models/e-image--default.json",
		defaultTemplate: path + "/e-image.tpl",
		name: 'e-image',
		root: '.e-image',
		initialize: function() {
		},
		bind: function(){
		}
	};
});
