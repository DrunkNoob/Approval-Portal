<?php
function dbInstans() : PDO{
    static $db;
    if($db === null) {
        $db = new PDO('mysql:host=localhost;dbname=approvalportal;charset=utf8', 'root', '', [
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_NAMED
        ]);
    }

    return $db;
}

function dbQuery(string $sql, array $params = []) : PDOStatement{
    $db = dbInstans();
    $query = $db->prepare($sql);
    $query->execute($params);
    

    dbCheckError($query);

    return $query;
}

function dbCheckError(PDOStatement $query) {
    $errInfo = $query->errorInfo();

    if($errInfo[0] !== PDO::ERR_NONE) {
        echo $errInfo[2];
    exit();
    }

    return true;

}