
<div class="m-components">
    {foreach $components as $component_name => $component_value}
        <m-component>
            <data name="component">
                {$component_value|json_encode}
            </data>
        </m-component>
    {/foreach}
</div>
