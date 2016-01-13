define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/modules/m-menumain";

	return {
		renderer: require('renderer'),
		name: 'm-menumain',
		defaultModel: path + "/models/m-menumain--default.json",
		defaultTemplate: path + "/m-menumain.tpl",
		root: '.m-menumain',
		initialize: function() {
		},
		bind: function(){
		}
	};
});
