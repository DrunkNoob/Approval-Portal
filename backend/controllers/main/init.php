<?php

include_once('model/users.php');
include_once('model/positions.php');
include_once('model/departments.php');
include_once('model/accesslevels.php');
include_once('view.php');

    $id_user = 1;

    $userMainInfo = userMainInfo($id_user);
    $accessLevels = accessLevelsAll();
    $departments = departmentsAll();
    $positions = positionsAll();
    $users = usersAll();

    $q = ['main' => [
        'idUser'=> $id_user,
        'accessLevel'=> (int)$userMainInfo["id_acc"],
        'department' => $userMainInfo["department"],
        'position' => $userMainInfo["position"],
        
          'accessLevels' => $accessLevels,
          'positions' => $positions,
          'departments' => $departments,
          'users' => $users
      ]
        ];

    outJSON($q, true);