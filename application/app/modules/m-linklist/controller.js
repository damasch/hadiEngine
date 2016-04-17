define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/modules/m-linklist";

	return {
		renderer: require('renderer'),
		name: 'm-linklist',
		defaultModel: path + "/models/default.json",
		defaultTemplate: path + "/view.tpl",
		root: '.m-linklist',
		list: '.m-linklist-list',
		item: '.m-linklist-item',
		initialize: function() {
		},
		bind: function(){
		}
	};
});
