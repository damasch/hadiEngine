define(['require', '$', 'renderer'], function (require, renderer) {

	var path = "/modules/m-linklist";

	return {
		renderer: require('renderer'),
		name: 'm-linklist',
		defaultModel: path + "/models/m-linklist--default.json",
		defaultTemplate: path + "/m-linklist.tpl",
		root: '.m-linklist',
		list: '.m-linklist-list',
		item: '.m-linklist-item',
		initialize: function() {
		},
		bind: function(){
		}
	};
});
