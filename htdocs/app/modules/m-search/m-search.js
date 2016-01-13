define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/modules/m-search";

	return {
		renderer: require('renderer'),
		name: 'm-search',
		defaultModel: path + "/models/m-search--default.json",
		defaultTemplate: path + "/m-search.tpl",
		root: '.m-search',
		initialize: function() {
		},
		bind: function(){

			var module = this;
		}
	};
});
