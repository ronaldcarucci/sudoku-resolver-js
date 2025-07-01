let grid = null;
let zeros = null;

const cancelSelection = () => {
  document.querySelectorAll('table td.selected').forEach(selected => {
    selected.classList.remove('selected');
  });
  document.querySelectorAll('table td.near-selected').forEach(selected => {
    selected.classList.remove('near-selected');
  }); 
}

const generateDomFromGrid = (grid) => {
  let dom = '';
  let tableBody = document.querySelector('table tbody');
  tableBody.innerHTML = '';
  for (let i = 0; i < grid.lines; i++) {
    dom += '<tr>';
    for (let j = 0; j < grid.columns; j++) {
      dom += '<td class="table-element" data-row="' + i + '" data-col="' + j + '">';
      if (grid[i][j] !== 0) {
        dom += '<span class="table-element">' + grid[i][j] +'</span>';
      }
      else {
        dom += `<input 
                  class="table-element"
                  type="number" 
                  min="1"
                  max="9"
                  id="g-` + i + `-` + j + `" 
                  data-row="` + i + `" 
                  data-col="` + j + `"
                />`;
      }
      dom += '</td>';
    }
    dom += '</tr>';
  }
  tableBody.innerHTML = dom;
}

const getGridFromDom = grid => {
  for (let i = 0; i < grid.lines; i++) {
    for (let j = 0; j < grid.columns; j++) {
      let cell = document.querySelector('td[data-row="'+ i +'"][data-col="'+ j + '"]');
      let cellSpan = cell.querySelector('span');
      let cellInput = cell.querySelector('input');
      
      if (cellSpan !== null) {
          grid.values[i][j] = parseInt(cellSpan.innerText);
      }
      else {
        if (cellInput !== null) {
          grid.values[i][j] = cellInput.value !== '' ? parseInt(cellInput.value) : 0;
        }
      }
    }
  }
}

const printGridIntoDom = (grid, onlyInput = false) => {
  for (let i = 0; i < grid.lines; i++) {
    for (let j = 0; j < grid.columns; j++) {
      let cell = document.querySelector('td[data-row="'+ i +'"][data-col="'+ j + '"]');
      let cellSpan = cell.querySelector('span');
      let cellInput = cell.querySelector('input');
      
      if (cellSpan !== null) {
        if (!onlyInput) {
          cellSpan.innerText = grid.values[i][j];
        }
      }
      else {
        if (cellInput !== null) {
          cellInput.value = grid.values[i][j] > 0 ? grid.values[i][j] : '';
        }
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let btnSolve = document.querySelector('#btn_solve');
  
  grid = new Grid({
    columns : 9,
    lines : 9,
    maxValue : 9,
    minValue : 1,
    sumToHave : 45,
    values : gridValues
  });

  printGridIntoDom(grid);

  zeros = grid.searchZeros();

  btnSolve.addEventListener('click', () => {
    getGridFromDom(grid);
    grid.autoSolve();
    printGridIntoDom(grid, true);

  });

  document.querySelectorAll(':not(table, table *)').forEach(element => {
    element.addEventListener('click', (e) => {
      if(!(e.target.classList.contains('table-element'))) {
        cancelSelection();
      }
    });
  })

  document.querySelectorAll('table td').forEach(cell => {
    cell.addEventListener('click', () => {
      cancelSelection();
      let row = parseInt(cell.dataset.row);
      let col = parseInt(cell.dataset.col);
      for (let i = 0; i < grid.lines; i++) {
        if (i !== row) {
          let cell = document.querySelector('td[data-row="'+ i +'"][data-col="'+ col + '"]');
          cell.classList.add('near-selected');
        }
      }
      for (let i = 0; i < grid.columns; i++) {
        if (i !== col) {
          let cell = document.querySelector('td[data-row="'+ row +'"][data-col="'+ i + '"]');
          cell.classList.add('near-selected');
        }
      }
      
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let indexI = row - (row % 3) + i;
          let indexJ = col - (col % 3) + j;
          if (indexI !== row && indexJ !== col) {
            let cell = document.querySelector('td[data-row="'+ indexI +'"][data-col="'+ indexJ + '"]');
            cell.classList.add('near-selected');
          }
        }
      }
      cell.classList.add('selected');
    });
  });
});