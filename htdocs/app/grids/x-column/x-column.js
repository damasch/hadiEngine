define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/grids/x-column";

	return {
		renderer: require('renderer'),
		defaultModel: path + "/models/x-column--default.json",
		defaultTemplate: path + "/x-column.tpl",
		name: 'x-column',
		root: '.x-column',
		initialize: function() {
		},
		bind: function(){
			return;
		}
	};
});
