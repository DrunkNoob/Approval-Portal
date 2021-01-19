<?php

include_once('core/db.php');

function departmentsAll() : array{
    $sql = "SELECT * FROM departments";
    $query = dbQuery($sql);
    return $query->fetchAll();
}

function departmentsOne(int $id) {
    $sql = "SELECT title FROM departments WHERE id_dep=:id";
    $query = dbQuery($sql, ['id' => $id]);
    return $query->fetch();
}
