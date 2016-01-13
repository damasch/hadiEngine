define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/modules/m-menumainitem";

	return {
		renderer: require('renderer'),
		name: 'm-menumainitem',
		defaultModel: path + "/models/m-menumainitem--default.json",
		defaultTemplate: path + "/m-menumainitem.tpl",
		root: '.m-menumainitem',
		initialize: function() {
		},
		bind: function(){
		}
	};
});
