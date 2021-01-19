<?php

include_once('model/agreements.php');
include_once('view.php');

    // $num = 285028;
    $num = (int)NUM_PARAMS;
    $exists = agreementsExists($num);
    $exists = array_values($exists);

    if($exists[0] == true) {
        $agreement = agreementsOne($num);
        $reviewers = reviewers($num);
        $agreement['reviewers'] = $reviewers;
        outJSON($agreement, true);
    } else {
        include_once('controllers/errors/e404.php');
    }
    

    

