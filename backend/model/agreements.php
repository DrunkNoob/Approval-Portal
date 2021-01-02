<?php

include_once('core/db.php');

function agreementsAll() : array{
    $sql = "SELECT * FROM agreements ORDER BY creation_date DESC";
    $query = dbQuery($sql);
    return $query->fetchAll();
}

function agreementsOne(int $id) {
    $sql = "SELECT * FROM agreements WHERE id_agr=:id";
    $query = dbQuery($sql, ['id' => $id]);
    return $query->fetch();
}

function agreementsAdd(array $fields) : bool{
    $sql = "INSERT agreements (id_typ, id_cat, price, contract_num, contract_date, contract_sub, dep_res, contract_own, contract_adm, inn, verification, reason_ver, id_risk, creator_agr) VALUES (:id_typ, :id_cat, :price, :contract_num, :contract_date, :contract_sub, :dep_res, :contract_own, :contract_adm, :inn, :verification, :reason_ver, :id_risk, :creator_agr)";
    dbQuery($sql, $fields);
    return true;
}

// id_typ, id_cat, price, contract_num, contract_date, contract_sub, dep_res, contract_own, contract_adm, inn, verification, reason_ver, id_risk, creator_agr, creation_date, status_agr
function agreementsValidate(array $fields) : array{
    $errors = [];

    if(!isValidLen($fields['price'], 3, 30)) {
        $errors[] = 'Введите от 3 до 30 символов!';
    }
    if(!isValidLen($fields['contract_num'], 4, 30)) {
        $errors[] = 'Введите от 4 до 30 символов!';
    }
    if(!isValidLen($fields['contract_sub'], 5, 50)) {
        $errors[] = 'Введите от 5 до 50 символов!';
    }
    if(!isValidLen($fields['inn'], 5, 50)) {
        $errors[] = 'Введите от 5 до 50 символов!';
    }
    
    foreach($fields as &$field) {
        $field = htmlspecialchars($field);
    }


    return $errors;
}

function isValidLen(string $value, int $q = 5, int $b = 200) : bool{
    return ((mb_strlen($value, 'UTF-8') >= $q) && (mb_strlen($value, 'UTF-8') < $b));
}
