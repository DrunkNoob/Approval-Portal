<?php

// include_once('model/users.php');
// include_once('model/agreements.php');
include_once('model/departments.php');
include_once('model/positions.php');
include_once('model/access_level.php');

include_once('model/type.php');
include_once('model/category.php');
include_once('model/risk.php');
include_once('view.php');

$qqq = [];
// $users = usersAll();
// $user = usersOne(5);
// $agreements = agreementsAll();
// $agreement = agreementsOne(1);
$departments = departmentsAll();
$positions = positionsAll();
$access_level = access_levelAll();

$type = typeAll();
$category = categoryAll();
$risk = riskAll();

$qqq[] = $departments;
$qqq[] = $positions;
$qqq[] = $access_level;

$qqq[] = $type;
$qqq[] = $category;
$qqq[] = $risk;
// print_r($agreement);
outJSON($qqq, true);
// var_dump($users);

