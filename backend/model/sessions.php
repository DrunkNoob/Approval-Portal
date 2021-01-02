<?php
function sessionsOne(int $id) {
    $sql = "SELECT * FROM sessions WHERE id_user=:id";
    $query = dbQuery($sql, ['id' => $id]);
    return $query->fetch();
}