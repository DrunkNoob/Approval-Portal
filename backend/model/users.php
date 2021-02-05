<?php

include_once('core/db.php');

function userMainInfo (int $id_user) {
    $sql = "SELECT id_acc, departments.department, positions.position 
    FROM users 
    LEFT JOIN departments ON users.id_dep = departments.id_dep
    LEFT JOIN positions ON users.id_pos = positions.id_pos 
    
    WHERE id_user=:id_user";
    $query = dbQuery($sql, ['id_user' => $id_user]);
    return $query->fetch();
}

function usersExists(int $id_user) {
    // SELECT COUNT(*) FROM table_name
    $sql = "SELECT EXISTS(SELECT id_user FROM users WHERE id_user=:id_user)";
    $query = dbQuery($sql, ['id_user' => $id_user]);
    return $query->fetch();
}

function usersAll() : array{
    $sql = "SELECT id_user, secondname, firstname, patronymic, email, departments.department, positions.position, accesslevels.accessLevel 
    FROM users 
    LEFT JOIN departments ON users.id_dep = departments.id_dep
    LEFT JOIN positions ON users.id_pos = positions.id_pos 
    LEFT JOIN accesslevels ON users.id_acc = accesslevels.id_acc
    ORDER BY id_user DESC";
    $query = dbQuery($sql);
    return $query->fetchAll();
}

function usersOne(int $id) {
    $sql = "SELECT id_user, secondname, firstname, patronymic, email, id_dep, id_pos, accesslevels.accessLevel 
    FROM users 
    LEFT JOIN accesslevels ON users.id_acc = accesslevels.id_acc
    WHERE id_user=:id";
    $query = dbQuery($sql, ['id' => $id]);
    return $query->fetch();
}

function usersVer(string $email) {
    $sql = "SELECT id_user, secondname, firstname, patronymic
    FROM users
    WHERE email=:email";
    $query = dbQuery($sql, ['email' => $email]);
    return $query->fetch();
}

function usersAdd(array $fields) {
    $sql = "INSERT 
    users 
    (secondname, firstname, patronymic, email, password, id_dep, id_pos, id_acc) 
    VALUES 
    (:secondname, :firstname, :patronymic, :email, :password, :id_dep, :id_pos, :id_acc)";
    $query = dbQuery($sql, $fields);
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

// function isValidLen(string $value, int $q = 5, int $b = 200) : bool{
//     return ((mb_strlen($value, 'UTF-8') >= $q) && (mb_strlen($value, 'UTF-8') < $b));
// }
