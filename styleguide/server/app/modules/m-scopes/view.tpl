
<div class="m-scopes">
    <h2 class="m-scopes-headline">Scopes</h2>
    {foreach $scopes as $scope_name => $scope_value}
        <div class="m-scopes-scope">
            <h3 class="m-scopes-subheadline">{$scope_name}</h3>
            <m-components components='{$scope_value|json_encode}'></m-components>
        </div>
    {/foreach}
</div>
