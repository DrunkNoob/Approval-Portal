<?php

    function isValidLen(string $value, int $q = 5, int $b = 200) : bool{
        return ((mb_strlen($value, 'UTF-8') >= $q) && (mb_strlen($value, 'UTF-8') < $b));
    }


    function extractFields(array $target, array $fields) : array{
        $res = [];

        foreach($fields as $fild) {
            $res[$fild] = trim($target[$fild]);
        }

        return $res;
    }