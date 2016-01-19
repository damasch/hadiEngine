define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/modules/m-menumain";

	return {
		renderer: require('renderer'),
		name: 'm-menumain',
		defaultModel: path + "/models/default.json",
		defaultTemplate: path + "/view.tpl",
		root: '.m-menumain',
		initialize: function() {
		},
		bind: function(){
		}
	};
});
