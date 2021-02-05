<?php

include_once('core/db.php');

function accessLevelsAll() : array{
    $sql = "SELECT * FROM accessLevels";
    $query = dbQuery($sql);
    return $query->fetchAll();
}
