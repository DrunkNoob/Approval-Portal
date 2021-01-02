<?php

include_once('core/db.php');

function typeAll() : array{
    $sql = "SELECT * FROM type";
    $query = dbQuery($sql);
    return $query->fetchAll();
}