<?php

include_once('core/db.php');

function usersAll() : array{
    $sql = "SELECT * FROM users ORDER BY reg_date DESC";
    $query = dbQuery($sql);
    return $query->fetchAll();
}

function usersOne(int $id) {
    $sql = "SELECT * FROM users WHERE id_user=:id";
    $query = dbQuery($sql, ['id' => $id]);
    return $query->fetch();
}

function usersAdd(array $fields) : bool{
    $sql = "INSERT users (secondname, firstname, patronymic, email, password, id_dep, id_pos, id_acc) VALUES (:secondname, :firstname, :patronymic, :email, :password, :id_dep, :id_pos, :id_acc)";
    dbQuery($sql, $fields);
    return true;
}

// secondname, firstname, patronymic, email, password, id_dep, id_pos, id_acc
function usersValidate(array $fields) : array{
    $errors = [];

    if(!isValidLen($fields['secondname'], 1, 30)) {
        $errors[] = 'Введите от 2 до 30 символов!';
    }
    if(!isValidLen($fields['firstname'], 1, 30)) {
        $errors[] = 'Введите от 2 до 30 символов!';
    }
    if(!isValidLen($fields['patronymic'], 1, 30)) {
        $errors[] = 'Введите от 2 до 30 символов!';
    }
    if(!isValidLen($fields['email'], 6, 30)) {
        $errors[] = 'Введите от 6 до 30 символов!';
    }
    if(!isValidLen($fields['password'], 4, 30)) {
        $errors[] = 'Введите от 5 до 30 символов!';
    }
    
    foreach($fields as &$field) {
        $field = htmlspecialchars($field);
    }


    return $errors;
}

function isValidLen(string $value, int $q = 5, int $b = 200) : bool{
    return ((mb_strlen($value, 'UTF-8') >= $q) && (mb_strlen($value, 'UTF-8') < $b));
}
