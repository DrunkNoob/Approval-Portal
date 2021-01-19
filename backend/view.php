<?php

function outJSON($result, bool $ok) {
    $out = array(
        'ok' => $ok,
        'result' => $result
    );
    
    // Устанавливаем заголовот ответа в формате json
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Request-Method: POST');
    header('Access-Control-Allow-Credentials: false');
    header('Access-Control-Allow-Headers: *');
    
    
    // Кодируем данные в формат json и отправляем
     echo json_encode($out);
}