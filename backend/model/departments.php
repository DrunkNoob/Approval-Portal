<?php

include_once('core/db.php');

function departmentsAll() : array{
    $sql = "SELECT * FROM departments";
    $query = dbQuery($sql);
    return $query->fetchAll();
}
