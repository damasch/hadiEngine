define(function (require) {
	var renderer = require('renderer');

	renderer.registerModules([
		// GRIDS
		require('grids/x-grid/x-grid'),
		require('grids/x-row/x-row'),
		require('grids/x-column/x-column'),

		// ELEMENTS
		require('elements/e-link/e-link'),
		require('elements/e-image/e-image'),

		// MODULES
		require('modules/m-contentbox/m-contentbox'),
		require('modules/m-intro/m-intro'),
		require('modules/m-teaser/m-teaser'),
		require('modules/m-search/m-search'),
		require('modules/m-linklist/m-linklist'),
		require('modules/m-menumain/m-menumain'),
		require('modules/m-menumainitem/m-menumainitem'),

		// GROUPS
		require('groups/g-application/g-application'),
		require('groups/g-header/g-header'),
		require('groups/g-content/g-content')
		]);
	renderer.render().then(function(){
	});
});
