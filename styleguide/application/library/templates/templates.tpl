<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>Hadi Engine - styleguide</title>
	<link href="/public/css/style.css" rel="stylesheet">
</head>
<body>
	<h1>templates</h1>
	{foreach from=$scopes item=scope key=scopeName}
		<h2>{$scopeName}</h2>
		{foreach from=$scope item=templateObject}
			<div class="template">
				<a href="{$templateObject.dokumentation}" target="_blank">
					{$templateObject.name}
				</a>
				<pre>{$templateObject|var_dump}</pre>
			</div>
		{/foreach}
	{/foreach}
</body>
</html>
