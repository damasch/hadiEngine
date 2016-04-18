
<div class="m-scopes">
    <h2 class="m-scopes-headline">Scopes</h2>
    {foreach $scopes as $scope_name => $scope_value}
        <div class="m-scopes-scope">
            <h3 class="m-scopes-subheadline">{$scope_name}</h3>
            <m-components>
                <data name="components">
                    {$scope_value|json_encode}
                </data>
            </m-components>
        </div>
    {/foreach}
</div>
