
<div class="m-scopes">
    <h2>Scopes</h2>
    {foreach $scopes as $scope_name => $scope_value}
        <h3>{$scope_name}</h3>
        <m-components components='{$scope_value|json_encode}'></m-components>
    {/foreach}
</div>
