<?php

include_once('core/db.php');

function riskAll() : array{
    $sql = "SELECT * FROM risk";
    $query = dbQuery($sql);
    return $query->fetchAll();
}