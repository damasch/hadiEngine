define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/grids/x-column";

	return {
		renderer: require('renderer'),
		defaultModel: path + "/models/default.json",
		defaultTemplate: path + "/view.tpl",
		name: 'x-column',
		root: '.x-column',
		initialize: function() {
		},
		bind: function(){
			return;
		}
	};
});
