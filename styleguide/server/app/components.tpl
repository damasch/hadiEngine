{extends file="/page.tpl"}

{block 'content' append}

<h1>templates</h1>
	{foreach from=$scopes item=scope key=scopeName}
		<h2>{$scopeName}</h2>
		{foreach from=$scope item=templateObject}
			<div class="template">
				<a href="{$templateObject.dokumentation}" target="_blank">
					{$templateObject.name}
				</a>
			</div>
		{/foreach}
	{/foreach}

{/block}
