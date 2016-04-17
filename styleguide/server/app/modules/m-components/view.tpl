
<div class="m-components">
    {foreach $components as $component_name => $component_value}
        <m-component component='{$component_value|json_encode}'></m-component>
    {/foreach}
</div>
