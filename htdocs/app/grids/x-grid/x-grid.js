define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/grids/x-grid";

	return {
		renderer: require('renderer'),
		defaultModel: path + "/models/x-grid--default.json",
		defaultTemplate: path + "/x-grid.tpl",
		name: 'x-grid',
		root: '.x-grid',
		initialize: function() {
		},
		bind: function(){
			return;
		}
	};
});
