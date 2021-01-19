<?php

include_once('model/users.php');
include_once('model/positions.php');
include_once('model/departments.php');

include_once('view.php');


    $users = usersAll();
    $positions = positionsAll();
    $departments =departmentsAll();

    $q = ['main' => [

        'idUser'=> 1,
        'accessLevel'=> 1,
        'otdel' => 'Карательный',
        'position' => 'Менеджер по продажам',
        
          'positions' => $positions,
          'departments' => $departments,
          'users' => $users
      ]
        ];

    outJSON($q, true);