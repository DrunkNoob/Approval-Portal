<?php

function parseRouter(string $router, array $routes, $params) :array {
    $res = [
        'controller' => 'errors/e404',
        'params' => ''
    ];

    foreach($routes as $route) {
       if($route['router'] == $router) {
           $res['controller'] = $route['controller'];
           if($route['params'] !== false) {
                 if(is_numeric($params)) {
                     if((int)$params>0) {
                        $res['params'] = $params;
                     } else {
                        $res['controller'] = 'errors/e404';
                    }
                } else if(is_array($params)){
                    $res['params'] = $params;
                } else {
                    $res['controller'] = 'errors/e404';
                }
           }
       }
    }
    return $res;
}