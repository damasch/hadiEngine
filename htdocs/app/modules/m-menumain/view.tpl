
<div class="m-menumain">
	<nav class="m-menumain-nav">
		{foreach from=$navigation.items item=item}
			<m-menumainitem data-rawdata='{$item|source}'></m-menumainitem>
		{/foreach}
	</nav>
</div>
