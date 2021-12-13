var fs = require('fs');

let rows = [];
let folds = [];
let grid = [];

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day13/input.txt')
});

lineReader.on('line', function (line) {
  if (line == "") {
    return;
  }

  if (line.substring(0, 1) == "f") {
    let split = line.split("=");
    folds.push([split[0].substring(11), Number(split[1])]);
    return;
  }
  rows.push(line.split(",").map(x => Number(x)));
});

function printResult() {
  let output = "";
  for (let i = 0; i < grid.length; i++) {
    output += grid[i].join("") + "\r\n";
  }

  fs.writeFile('day13/output.txt', output, function (err, file) {
    if (err) throw err;
    console.log('Saved!');
  }); 

  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == 1) {
        count++;
      }
    }
  }

  console.log(count);
}

function makeGrid() {
  let maxX = rows.reduce((previousValue, currentValue) => Math.max(previousValue, currentValue[0]), 0);
  let maxY = rows.reduce((previousValue, currentValue) => Math.max(previousValue, currentValue[1]), 0);

  grid = [...Array(maxY + 1)].map((x) => Array(maxX + 1).fill(0));
}

function markGrid() {
  for (let i = 0; i < rows.length; i++) {
    const xy = rows[i];

    grid[xy[1]][xy[0]] = 1;
  }
}

function doFolds() {
  for (let i = 0; i < folds.length; i++) {
    const fold = folds[i];

    if (fold[0] == "y") {
      let newGrid = [...grid];
      newGrid = newGrid.slice(0, fold[1]);

      for (let j = 0; j < newGrid.length; j++) {
        for (let k = 0; k < newGrid[0].length; k++) {
          // newGrid[y][x]
          let opposite = (grid.length - 1) - j;
          newGrid[j][k] = grid[j][k] == 1 || grid[opposite][k] == 1 ? 1 : 0;
        }
      }

      grid = newGrid;
    }


    if (fold[0] == "x") {
      let newGrid = [];
      for (let i = 0; i < grid.length; i++) {
        newGrid.push([...grid[0]]);
      }

      for (let i = 0; i < newGrid.length; i++) {
        newGrid[i].splice(fold[1]);
      }

      for (let j = 0; j < newGrid.length; j++) {
        for (let k = 0; k < newGrid[0].length; k++) {
          // newGrid[y][x]
          let opposite = (grid[0].length - 1) - k;
          newGrid[j][k] = grid[j][k] == 1 || grid[j][opposite] == 1 ? 1 : 0;
        }
      }

      grid = newGrid;
    }
  }

}

function process() {
  makeGrid();
  markGrid();
  doFolds();
}

lineReader.on('close', function () {
  process();
  printResult();
});