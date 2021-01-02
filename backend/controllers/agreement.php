<?php

include_once('model/agreements.php');
include_once('view.php');

function prepareAgreement(int $id) {
    $agreement = agreementsOne($id);
    $q = [];
    $q[] = $agreement;

    outJSON($q, true);
}


