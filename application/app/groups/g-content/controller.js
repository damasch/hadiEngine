define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/groups/g-content";

	return {
		renderer: require('renderer'),
		name: 'g-content',
		defaultModel: path + "/models/default.json",
		defaultTemplate: path + "/view.tpl",
		root: '.g-content',
		initialize: function() {
		},
		bind: function(){
			var module = this;
		}
	};
});
