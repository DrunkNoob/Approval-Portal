<?php

return (function() {
 $int = '[1-9]+\d*';
return [
    [
        'router' => 'main', 
        'params' => false,
        'controller' => 'main/init'
    ],
    [
        'router' => 'auth',
        'params' => false,
        'controller' => 'auth/login'
    ],
    [
        'router' => 'agreements', 
        'params' => false,
        'controller' => 'agreements/all'
    ],
    [
        'router' => 'agreement', 
        'params' => "[1-9]+\d*",
        'controller' => 'agreements/one'
    ],
    [
        'router' => 'newAgreement', 
        'params' => false,
        'controller' => 'agreements/add'
    ],
    [
        'router' => 'user',
        'params' => $int,
        'controller' => 'users/one'
    ],
    [
        'router' => 'users', 
        'params' => false,
        'controller' => 'users/all'
    ]
    
];
 })();