<?php

include_once('core/db.php');

function positionsAll() : array{
    $sql = "SELECT * FROM positions";
    $query = dbQuery($sql);
    return $query->fetchAll();
}
