define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/modules/m-menumainitem";

	return {
		renderer: require('renderer'),
		name: 'm-menumainitem',
		defaultModel: path + "/models/default.json",
		defaultTemplate: path + "/view.tpl",
		root: '.m-menumainitem',
		initialize: function() {
		},
		bind: function(){
		}
	};
});
