<!DOCTYPE html>
<html>
	<head>
		<title>EarthTime</title>
		<link rel="stylesheet" href="dist/style.css?<?=filemtime('dist/style.css') ?>" />
	</head>
	<body>
		
		<form action="#" method="post" id="container"></form>
		
		<script type="text/javascript">
			window.EARTH = {
				current: 'America/Los_Angeles',
				list: <?=json_encode(array_map('trim', file('timezones.txt'))) ?>,
			};
		</script>
		<script src="dist/scripts.js?<?=filemtime('dist/scripts.js') ?>"></script>
		
	</body>
</html>