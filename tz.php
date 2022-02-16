<?php

$list = file('test.txt');
sort($list);

echo sprintf('<pre>%s</pre>', implode("", array_unique($list)));

?>