<?php

include_once('model/users.php');
include_once('view.php');


    $users = usersAll();

    outJSON($users, true);
