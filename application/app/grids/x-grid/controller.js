define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/grids/x-grid";

	return {
		renderer: require('renderer'),
		defaultModel: path + "/models/default.json",
		defaultTemplate: path + "/view.tpl",
		name: 'x-grid',
		root: '.x-grid',
		initialize: function() {
		},
		bind: function(){
			return;
		}
	};
});
