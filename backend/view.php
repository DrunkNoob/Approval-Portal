<?php

function outJSON($result, bool $ok) {

    $out = array(
        'ok' => $ok,
        'result' => $result
    );
    
    // Устанавливаем заголовот ответа в формате json
    header('Content-Type: text/json; charset=utf-8');
    
    // Кодируем данные в формат json и отправляем
     echo json_encode($out);
}