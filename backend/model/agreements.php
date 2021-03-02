<?php

include_once('core/db.php');

function agreementsCount() : int{
    // SELECT COUNT(*) FROM table_name
    $sql = "SELECT COUNT(*) as count FROM agreements";
    $query = dbQuery($sql);
    return $query->fetchColumn();
}

function agreementsExists(int $num) {
    // SELECT COUNT(*) FROM table_name
    $sql = "SELECT EXISTS(SELECT contract_num FROM agreements WHERE contract_num=:num)";
    $query = dbQuery($sql, ['num' => $num]);
    return $query->fetch();
}

function agreementsAll() : array{
    $sql = "SELECT id_agr, types.type, categories.category, price, contract_num, 
    contract_date, contract_sub, departments.department, inn, verification, reason_ver,  
    risks.risk, status_agr.status,
   
    (select concat(u.secondname, ' ', u.firstname) from users u where u.id_user = agreements.contract_own) contract_own,
    (select concat(u.secondname, ' ', u.firstname) from users u where u.id_user = agreements.contract_adm) contract_adm,
    (select concat(u.secondname, ' ', u.firstname) from users u where u.id_user = agreements.creator_agr) creator_agr

FROM agreements 
LEFT JOIN types ON agreements.id_typ = types.id_typ
LEFT JOIN categories ON agreements.id_cat = categories.id_cat
LEFT JOIN departments ON agreements.dep_res = departments.id_dep
LEFT JOIN risks ON agreements.id_risk = risks.id_risk
LEFT JOIN status_agr ON agreements.id_status = status_agr.id_status
ORDER BY creation_date DESC";
    $query = dbQuery($sql);
    return $query->fetchAll();
}

function agreementsOne(int $num) : array{
    $sql = "SELECT id_agr, types.type, categories.category, price, contract_num, 
    contract_date, contract_sub, departments.department, inn, verification, reason_ver,  
    risks.risk, status_agr.status, creation_date,
   
    (select concat(u.secondname, ' ', u.firstname, ' ', u.patronymic, ' (', (select d.department from departments d where d.id_dep = u.id_dep), '/', (select p.position from positions p where p.id_pos = u.id_pos), ')') from users u where u.id_user = agreements.contract_own) contract_own,
    (select concat(u.secondname, ' ', u.firstname, ' ', u.patronymic, ' (', (select d.department from departments d where d.id_dep = u.id_dep), '/', (select p.position from positions p where p.id_pos = u.id_pos), ')') from users u where u.id_user = agreements.contract_adm) contract_adm,
    (select concat(u.secondname, ' ', u.firstname, ' ', u.patronymic) from users u where u.id_user = agreements.creator_agr) creator_agr
    
    
    FROM agreements 
    LEFT JOIN types ON agreements.id_typ = types.id_typ
    LEFT JOIN categories ON agreements.id_cat = categories.id_cat
    LEFT JOIN departments ON agreements.dep_res = departments.id_dep
    LEFT JOIN risks ON agreements.id_risk = risks.id_risk 
    LEFT JOIN status_agr ON agreements.id_status = status_agr.id_status
    WHERE contract_num=:num";

    $query = dbQuery($sql, ['num' => $num]);
    return $query->fetch();
}

function agreementsVer(string $num) {
    $sql = "SELECT id_agr
    FROM agreements
    WHERE contract_num=:num";
    $query = dbQuery($sql, ['num' => $num]);
    return $query->fetch();
}

function reviewers(int $num) : array {
    $sql = "SELECT users.id_user, reviewers.status, reviewers.comment, concat(users.secondname, ' ', users.firstname, ' ', users.patronymic, ' (' , departments.department, '/', positions.position, ')') reviewer
    


    FROM agreements 
    INNER JOIN reviewers ON agreements.id_agr = reviewers.id_agr
    INNER JOIN users ON reviewers.id_user = users.id_user
    INNER JOIN positions ON users.id_pos = positions.id_pos
    INNER JOIN departments ON users.id_dep = departments.id_dep
    WHERE contract_num=:num";

    $query = dbQuery($sql, ['num' => $num]);
    return $query->fetchAll();
}

//(select concat(u.secondname, ' ', u.firstname, ' ', u.patronymic) from users u where u.id_user = agreements.creator_agr) reviewer
// INSERT INTO `agreements` (`id_agr`, `id_typ`, `id_cat`, `price`, `contract_num`, `contract_date`, `contract_sub`, `dep_res`, `contract_own`, `contract_adm`, `inn`, `verification`, `reason_ver`, `id_risk`, `creator_agr`, `creation_date`, `status_agr`) VALUES (NULL, '2', '2', '9000000', '15828244', current_timestamp(), 'Пельмеши рабочим', '1', '6', '2', '7841561', '1', NULL, '2', '5', current_timestamp(), '0');
function agreementsAdd(array $fields) : bool{
    $sql = "INSERT 
    agreements 
    (id_typ, id_cat, price, contract_num, contract_date, contract_sub, dep_res, contract_own, contract_adm, inn, verification, reason_ver, id_risk, creator_agr) 
    VALUES 
    (:id_typ, :id_cat, :price, :contract_num, :contract_date, :contract_sub, :dep_res, :contract_own, :contract_adm, :inn, :verification, :reason_ver, :id_risk, :creator_agr)";
    dbQuery($sql, $fields);
    return true;
}

function reviewersAdd(array $fields) : bool{
    $sql = "INSERT 
    reviewers 
    (id_agr, id_user, status) 
    VALUES 
    (:id_agr, :id_user, :status)";
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

// function isValidLen(string $value, int $q = 5, int $b = 200) : bool{
//     return ((mb_strlen($value, 'UTF-8') >= $q) && (mb_strlen($value, 'UTF-8') < $b));
// }
