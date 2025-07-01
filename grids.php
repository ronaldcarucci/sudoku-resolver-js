<?php
   function callApi() {
    $response = file_get_contents('https://youdosudoku.com/api');
    $response = json_decode($response);
    $grid = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
    ];
    $row = [];
    foreach(str_split($response->puzzle) as $key => $str) {
      $col = $key % 9; 
      $row = ($key - $col) / 9;
      $grid[$row][$col] = intval($str);
      echo '<br />';
    }
    return $grid;
  }

  $gettedGrid = callApi();
?>