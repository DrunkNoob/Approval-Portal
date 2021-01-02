<?php

//Auth

$cname = $_GET['c'] ?? 'controllers';
$path = "controllers/$cname.php";
include_once($path);
