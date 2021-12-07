// x1,y1 -> x2,y2
let input = [];
let filteredInput = [];

let grid = [];

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day5/input.txt')
});

lineReader.on('line', function (line) {
  // 0,9 -> 5,9
  let xy = line.split("->");

  let inputRow = [];

  for (let i = 0; i < xy.length; i++) {
    let x = xy[i].split(",").map(str => Number(str));
    for (let j = 0; j < x.length; j++) {
      inputRow.push(x[j]);
    }

  }
  input.push(inputRow);
});


function makeGrid() {
  let maxX = input.reduce((previousValue, currentValue) => Math.max(previousValue, currentValue[0], currentValue[2]), 0);
  let maxY = input.reduce((previousValue, currentValue) => Math.max(previousValue, currentValue[1], currentValue[3]), 0);

  grid = [...Array(maxY + 1)].map((x) => Array(maxX + 1).fill(0));
}

function filterOutNonStraight() {
  // x1,y1 -> x2,y2
  filteredInput = input.filter(line => line[0] === line[2] || line[1] === line[3]);
}

function buildGrid() {
  // 0,9 -> 5,9
    for (pipe of filteredInput) {
      let xHeight = pipe[2] - pipe[0];
      let yHeight = pipe[3] - pipe[1];

      if (xHeight !== 0) {
        xHeight = xHeight < 0 ? -1 : 1
      }
      
      if (yHeight !== 0) {
        yHeight = yHeight < 0 ? -1 : 1
      }

      let x = pipe[0];
      let y = pipe[1];
      while (x !== pipe[2] || y != pipe[3]) {
        grid[y][x] += 1;
        x += xHeight;
        y += yHeight;
      }

      grid[y][x] += 1;
    }
}

function printResult() {
  console.log(grid.flat().filter((x) => x > 1).length);
}

lineReader.on('close', function () {
  filterOutNonStraight();
  makeGrid();
  buildGrid();
  printResult();
});