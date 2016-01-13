define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/grids/x-row";

	return {
		renderer: require('renderer'),
		defaultModel: path + "/models/x-row--default.json",
		defaultTemplate: path + "/x-row.tpl",
		name: 'x-row',
		root: '.x-row',
		initialize: function() {
		},
		bind: function(){
			return;
		}
	};
});
