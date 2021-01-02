<?php

include_once('core/db.php');

function access_levelAll() : array{
    $sql = "SELECT * FROM access_level";
    $query = dbQuery($sql);
    return $query->fetchAll();
}
