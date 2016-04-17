define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/grids/x-row";

	return {
		renderer: require('renderer'),
		defaultModel: path + "/models/default.json",
		defaultTemplate: path + "/view.tpl",
		name: 'x-row',
		root: '.x-row',
		initialize: function() {
		},
		bind: function(){
			return;
		}
	};
});
