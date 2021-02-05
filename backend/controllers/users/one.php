<?php

include_once('model/users.php');
include_once('view.php');


    $id_user = (int)NUM_PARAMS;
    $exists = usersExists($id_user);
    $exists = array_values($exists);

    if($exists[0] == true) {
        $user = usersOne($id_user);
        outJSON($user, true);
    } else {
        include_once('controllers/errors/e404.php');
    }