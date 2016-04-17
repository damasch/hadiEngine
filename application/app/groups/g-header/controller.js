define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/groups/g-header";

	return {
		renderer: require('renderer'),
		name: 'g-header',
		defaultModel: path + "/models/default.json",
		defaultTemplate: path + "/view.tpl",
		root: '.g-header',
		initialize: function() {
		},
		bind: function(){
			var module = this;
		}
	};
});
