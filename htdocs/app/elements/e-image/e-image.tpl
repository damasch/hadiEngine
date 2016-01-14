
<picture class="e-image">
	{if $sourceDesktop}
		<source data-srcset="{$sourceDesktop}" media="(min-width: 1025px)" />
	{/if}
	{if $sourceTablet}
		<source data-srcset="{$sourceTablet}" media="(min-width: 1024px)" />
	{/if}
	{if $sourceMiniTablet}
		<source data-srcset="{$sourceMiniTablet}" media="(min-width: 768px)" />
	{/if}
	{if $sourceMobile}
		<source data-srcset="{$sourceMobile}" media="(min-width: 480px)" />
	{/if}
	{if $sourceMobileSmall}
		<source data-srcset="{$sourceMobileSmall}" media="(min-width: 320px)"/>
	{/if}
	{if $sourceDefault}
		<img class="e-image-default" content="{$sourceDefault}" data-srcset="{$sourceDefault}" alt="{$sourceDefault} {$alt}">
		<noscript>
			<img class="e-image-fallback" content="{$sourceDefault}" src="{$sourceDefault}" alt="{$sourceDefault} {$alt}">
		</noscript>
	{/if}
</picture>