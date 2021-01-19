<?php

include_once('model/agreements.php');
include_once('view.php');


    $page = 1;
    $totalPage = 1;
    $limit = 10;
    $agreementsCount = agreementsCount();
    $agreements = agreementsAll();


    $q = array(
        'page' => 1,
        'totalPages' => 1,
        'limit' => $limit,
        'allAgreements' => $agreementsCount,
    );

    $q['agreements'] = $agreements;

    outJSON($q, true);