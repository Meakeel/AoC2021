let rows = [];

let flashCount = 0;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day11/input.txt')
});

lineReader.on('line', function (line) {
  rows.push(line.split("").map(x => Number(x)));
});

function ageOcti() {
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];

    for (let j = 0; j < row.length; j++) {
      row[j]++;
    }
  }
}

function loopInput() {
  processing = true;

  let xLength = rows.length;
  let yLength = rows[0].length;

  while (processing) {
    processing = false;
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];

      for (let j = 0; j < row.length; j++) {
        let octi = row[j];

        if (octi > 9) {
          processing = true;

          increaseAdjacent(i, j, xLength, yLength);

          row[j] = 0;
          flashCount++;
        }
      }
    }
  }

};

function increaseAdjacent(x, y, xLength, yLength) {
  // If Adjacent == 0 then don't increse

  // Check above
  if (x != 0) {
    if (rows[x - 1][y] != 0) {
      rows[x - 1][y]++;
    }
  }

  // Check above left
  if (x != 0 && y != 0) {
    if (rows[x - 1][y - 1] != 0) {
      rows[x - 1][y - 1]++;
    }
  }

  // Check above right
  if (x != 0 && y != yLength - 1) {
    if (rows[x - 1][y + 1] != 0) {
      rows[x - 1][y + 1]++;
    }
  }

  // Check below
  if (x != xLength - 1) {
    if (rows[x + 1][y] != 0) {
      rows[x + 1][y]++;
    }
  }

  // Check left
  if (y != 0) {
    if (rows[x][y - 1] != 0) {
      rows[x][y - 1]++;
    }
  }

  // Check right
  if (y != yLength - 1) {
    if (rows[x][y + 1] != 0) {
      rows[x][y + 1]++;
    }
  }

  // Check below left
  if (x != xLength - 1 && y != 0) {
    if (rows[x + 1][y - 1] != 0) {
      rows[x + 1][y - 1]++;
    }
  }

  // Check below right
  if (x != xLength - 1 && y != yLength - 1) {
    if (rows[x + 1][y + 1] != 0) {
      rows[x + 1][y + 1]++;
    }
  }
}

function printResult() {
  console.table(flashCount);
}

function checkZeros() {
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    for (let j = 0; j < row.length; j++) {
      let octi = row[j];
      if (octi != 0) {
        return false;
      }
    }
  }

  return true;
}

function process() {
  let isValid = false;
  let count = 0;

  while (isValid == false) {
    ageOcti();
    loopInput();
    isValid = checkZeros();
    count ++;
  }

  console.log(count);
}

lineReader.on('close', function () {
  process();
});