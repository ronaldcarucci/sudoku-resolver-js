<!doctype html>
<?php include_once('./grids.php'); ?>
<html>
  <?php
    $grid = $gettedGrid;
  ?>
  <head>
    <title>test Page</title>
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body>
    <h1>Sudoku</h1>
    <table>
      <tbody>
        <?php for($i=0; $i < 9; $i++) { ?>
          <tr>
            <?php for($j=0; $j < 9; $j++) { ?>
              <td class="table-element" data-row="<?= $i ?>" data-col="<?= $j ?>">
                <?php if ($grid[$i][$j] !== 0) { ?>
                  <span class="table-element"><?= $grid[$i][$j] ?></span>
                <?php } else { ?>
                  <input 
                    class="table-element"
                    type="number" 
                    min="1"
                    max="9"
                    id="g-<?= $i ?>-<?= $j ?>" 
                    data-row="<?= $i ?>" 
                    data-col="<?= $j ?> "
                  />
                <?php } ?>
              </td>
            <?php } ?>
          </tr>
        <?php } ?>
      <tbody>
    </table>
    <button id="btn_solve">
      Solve
    </button>
    <script>
      let gridValues = <?= json_encode($grid) ?>;
    </script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="./grid.js"></script>
    <script src="./script.js"></script>
  </body>
</html>
