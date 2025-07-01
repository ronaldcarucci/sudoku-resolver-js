class Grid {
  constructor(obj = {lines : 9,columns : 9,minValue : 1,maxValue : 9,sumToHave : 45,values : null}) {
      if (!(obj.lines <= 0 || obj.columns <= 0)) {
        this.lines = obj.lines;
        this.columns = obj.columns;
        this.minValue = obj.minValue;
        this.maxValue = obj.maxValue;
        this.sumToHave = obj.sumToHave;
        this.values = [];
        for (let i = 0 ; i < this.lines ; i++) {
        this.values[i] = [];
        for (let j = 0; j < this.columns; j++) {
          this.values[i][j] = 0;
        }
          
        if (obj.values !== null) {
          for (let i = 0 ; i < this.lines ; i++) {
            this.values[i] = [];
            for (let j = 0; j < this.columns; j++) {
              this.values[i][j] = obj.values[i][j];
            }
          }
        }
      }
    }
  }

  autoSolve(cancelIfError = true) {
    let zeros = this.searchZeros();
    let zerosTmp = this.searchZeros();
      
    let ended = false;
    while (!ended) {
      let nbrSet = 0;
      zerosTmp.filter(zero => zero.p.length === 1).forEach(zero => {
        this.values[zero.l][zero.c] = zero.p[0];
        nbrSet++;
      });
      ended = (nbrSet === 0);
      zerosTmp = this.searchZeros();
    }

    if (cancelIfError) {
      if (!this.check()) {
        this.cancelAutoSolve(zeros);
      }
    }
  }
  
  cancelAutoSolve(zeros) {
    for (let i = 0; i < zeros.length; i++) {
      this.values[zeros[i].l][zeros[i].c] = 0;
    }
  }
  
  checkColumns() {
    for (let j = 0; j < this.columns; j++) {
      let tmpSum = 0;
      for (let i = 0; i < this.lines; i++) {
        tmpSum += this.values[i][j];
      }
      if (tmpSum !== this.sumToHave) return false;
    }
    
    return true;
  }
  
  checkLines() {
    for (let i = 0; i < this.lines; i++) {
      let tmpSum = 0;
      for (let j = 0; j < this.columns; j++) {
        tmpSum += this.values[i][j];
      }
      if (tmpSum !== this.sumToHave) return false;
    }
    return true;
  }
  
  checkSquares() {
    for (let k = 0; k < 3; k++) {
      for (let l = 0; l < 3; l++) {
        let tmpSum3 = 0;
        for (let i = (0 + (3 * k)); i < (3 + (3 * k)); i++) {
          for (let j = (0 + (3 * l)); j < (3 + (3 * l)); j++) {
            tmpSum3 += this.values[i][j];
          }
        }
        if (tmpSum3 !== this.sumToHave) return false;
      }
    }
    return true;
  }
  
  check() {
    return this.checkLines() && this.checkColumns() && this.checkSquares();
  }
    
  increase(position) {
    this.values[position.l][position.c] ++;
  }

  isAvailable(row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (this.values[row][i] == num) {
        return false;
      }
      if (this.values[i][col] == num) {
        return false;
      }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let indexI = row - (row % 3) + i;
          let indexJ = col - (col % 3) + j;
          if (this.values[indexI][indexJ] == num) {
            return false;
          }
        }
      }
    return true;
  }
  
  printToConsole() {
    for (let l = 0; l < this.lines ; l++) {
      console.log(this.values[l]);
    }
  }
  
  searchZeros() {
    let zeros = [];
    
    for (let i = 0; i < this.lines; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.values[i][j] == 0) {
          let possibilities = [];
          for (let num = this.minValue; num <= this.maxValue ; num++) {
            if (this.isAvailable(i,j,num)) {
              possibilities.push(num);
            }
          }
          zeros.push({l : i, c: j, p: possibilities})
        }
      }
    }
    
    return zeros;
  }
}