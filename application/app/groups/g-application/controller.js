define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/groups/g-application";

	return {
		renderer: require('renderer'),
		name: 'g-application',
		defaultModel: path + "/models/default.json",
		defaultTemplate: path + "/view.tpl",
		root: '.g-application',
		initialize: function() {
		},
		bind: function(){
			var module = this;
		}
	};
});
