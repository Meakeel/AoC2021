let rows = [];

let count = 0;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day9/input.txt')
});

lineReader.on('line', function (line) {
  rows.push(line.split("").map(str => Number(str)));
});


function findLowPoints() {
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    for (let j = 0; j < row.length; j++) {
      let height = row[j];

      let validLowPoint = true;
      // Check above
      if (validLowPoint && i != 0) {
        validLowPoint = height < rows[i - 1][j];
      }

      // Check below
      if (validLowPoint && i != rows.length - 1) {
        validLowPoint = height < rows[i + 1][j];        
      }

      // Check left
      if (validLowPoint && j != 0) {
        validLowPoint = height < rows[i][j - 1];     
      }

      // Check right
      if (validLowPoint && j != row.length - 1) {
        validLowPoint = height < rows[i][j + 1];             
      }

      if (validLowPoint) {
        count += height + 1;
      }
    }
    
  }
}

function printResult() {
  console.log(count);
}

lineReader.on('close', function () {
  findLowPoints();
  printResult();
});