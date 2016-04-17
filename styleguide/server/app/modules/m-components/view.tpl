
<div class="m-components">
    Components
    {foreach $components as $component_name => $component_value}
        <m-component component='{$component_value|json_encode}'></m-component>
    {/foreach}
</div>
