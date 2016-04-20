
<div class="m-components">
    {foreach $components as $component_name => $component_value}
        <m-component>
            <data>
                {$component_value|json_encode}
            </data>
        </m-component>
    {/foreach}
</div>
