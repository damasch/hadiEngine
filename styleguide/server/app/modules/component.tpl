<div class="m-component">
	<h1 class="m-component-name">{$name}</h1>
	<h2>Stylesheet</h2>
	<h3>Modifires</h3>
	<ul class="m-component-modifiers">
	{foreach from=$style.modifier item=modifi}
		<li>{$modifi}</li>
	{/foreach}
	</ul>
</div>
