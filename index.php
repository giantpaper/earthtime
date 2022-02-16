<!DOCTYPE html>
<html>
	<head>
		<title>EarthTime</title>
		<link rel="stylesheet" href="dist/styles/main.css?<?=date('Y-m-d_H-i', filemtime('dist/styles/main.css')) ?>" />
	</head>
	<body>
		
		<div id="container">
			<div class="inner" id="table_wrapper"></div>
			
			<form action="#" method="post" id="add_timezone"><div id="add_timezone_inner"></div></form>
		</div>
		
		<script type="text/javascript">
			window.CONFIG = {
				home: 'America/Los_Angeles',
				locations: <?=json_encode(array_map('trim', file('timezones.txt'))) ?>,
			};
		</script>
		<script src="dist/scripts/main.js?<?=date('Y-m-d_H-i-s', filemtime('dist/scripts/main.js')) ?>"></script>
		
	</body>
</html>