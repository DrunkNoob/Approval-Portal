<?php

//Auth

include_once('init.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $str = file_get_contents("php://input");
    $data = json_decode($str, true);

    if(isset($data['router'])) {

        $routes = include('routes.php');
        $paramsParse = '';
        if(isset($data['params'])) {
            $paramsParse = $data['params'];
        }
        $routerRes = parseRouter($data['router'], $routes, $paramsParse);

        $cname = $routerRes['controller'];
        define('NUM_PARAMS', $routerRes['params']);
        $path = "controllers/$cname.php";
        // $path = "controllers/agreements/all.php";
        include_once($path);
    }
    

}
