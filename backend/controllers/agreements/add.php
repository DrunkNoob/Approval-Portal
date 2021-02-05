<?php

include_once('model/agreements.php');
include_once('view.php');

    // $responce = usersAdd();
    $fields = (array)NUM_PARAMS;
    $reviewers =$fields['reviewers'];
    $agreement = $fields['agreement'];
    //var_dump($agreement);
    // $responce = agreementsAdd($agreement);

 
   
    $agreementsVer = agreementsVer($agreement['contract_num']);
    // var_dump($agreementsVer);
    if ($agreementsVer === false) {
        $responce = agreementsAdd($agreement);
        if($responce) {
            $agreementsVer = agreementsVer($agreement['contract_num']);

            foreach($reviewers as $reviewer) {
                reviewersAdd(['id_agr' => $agreementsVer['id_agr'], 'status' => $reviewer['status'], 'id_user' => $reviewer['id_user']]);
            }
            
            $q = 'Согласование успешно добавлено! id: ' . $agreementsVer['id_agr'];
            $ok = true;
        } else {
            $q = 'Согласование не добавлено!';
        }
    } else {
        $ok = false;
        $q = 'Согласование с таким номером договора уже существует! id: ' . $agreementsVer['id_agr'];
    }

    outJSON($q, $ok);