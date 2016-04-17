define(function (require) {
	var renderer = require('renderer');

	renderer.registerModules([
		// GRIDS
		require('grids/x-grid/controller'),
		require('grids/x-row/controller'),
		require('grids/x-column/controller'),

		// ELEMENTS
		require('elements/e-link/controller'),
		require('elements/e-image/controller'),

		// MODULES
		require('modules/m-contentbox/controller'),
		require('modules/m-intro/controller'),
		require('modules/m-teaser/controller'),
		require('modules/m-search/controller'),
		require('modules/m-linklist/controller'),
		require('modules/m-menumain/controller'),
		require('modules/m-menumainitem/controller'),

		// GROUPS
		require('groups/g-application/controller'),
		require('groups/g-header/controller'),
		require('groups/g-content/controller')
		]);
	renderer.render().then(function(){
	});
});
