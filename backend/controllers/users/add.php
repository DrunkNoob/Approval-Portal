<?php

include_once('model/users.php');
include_once('view.php');

    $fields = (array)NUM_PARAMS;
    $usersVer = usersVer($fields['email']);

    if ($usersVer === false) {
        $responce = usersAdd($fields);
        if($responce) {
            $usersVer = usersVer($fields['email']);
            $q = 'Пользователь успешно добавлен! id: ' . $usersVer['id_user'] . '. ФИО: ' . $usersVer['secondname'] . ' ' . $usersVer['firstname'] . ' ' . $usersVer['patronymic'];
            $ok = true;
        } else {
            $q = 'Пользователь не добавлен!';
        }
    } else {
        $ok = false;
        $q = 'Пользователь с таким Email уже существует! id: ' . $usersVer['id_user'] . '. ФИО: ' . $usersVer['secondname'] . ' ' . $usersVer['firstname'] . ' ' . $usersVer['patronymic'];
    }

    outJSON($q, $ok);


