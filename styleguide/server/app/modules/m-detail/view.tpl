
<div class="m-detail">
	<h1 class="m-detail-name">{$name}</h1>
	<h2>Stylesheet</h2>
	<h3>Modifires</h3>
	<ul class="m-detail-modifiers">
	{foreach from=$style.modifier item=modifi}
		<li>{$modifi}</li>
	{/foreach}
	</ul>
	<content></content>
</div>
