let rows = [];

let results = [];
let xLength = 0;
let yLength = 0;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day9/input.txt')
});

lineReader.on('line', function (line) {
  rows.push(line.split("").map(str => Number(str)));
});

function checkAllDepths() {
  xLength = rows.length;
  yLength = rows[0].length;
  
  // Test cases
  // console.log(calculateBasinSize(5, 2, 2) == 14);
  // console.log(calculateBasinSize(1, 0, 1) == 3);
  // console.log(calculateBasinSize(0, 0, 9) == 9);
  // console.log(calculateBasinSize(5, 4, 6) == 9);

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] != 9) {
        let basinSize = calculateBasinSize(row[j], i, j);
        results.push(basinSize);
        // console.log({
        //   x: i,
        //   y: j,
        //   count: basinSize
        // });
      }
    }
  }
}

function calculateBasinSize(height, x, y) {
  let checkedMap = [...Array(rows.length)].map((x) => Array(rows[0].length).fill(0));
  let childCount = 1;

  checkedMap[x][y] = 1;

  if (height == 9) {
    return 0;
  }

  // Check above
  if (x != 0 && checkedMap[x - 1][y] != 1) {
    let validRoute = height < rows[x - 1][y] && rows[x - 1][y] != 9;
    if (validRoute) {
      checkedMap[x - 1][y] = 1;
      childCount++;
      childCount += countChildPoints(x - 1, y, checkedMap);
    }
  }

  // Check below
  if (x != xLength - 1 && checkedMap[x + 1][y] != 1) {
    let validRoute = height < rows[x + 1][y] && rows[x + 1][y] != 9;
    if (validRoute) {
      checkedMap[x + 1][y] = 1;
      childCount++;
      childCount += countChildPoints(x + 1, y, checkedMap);
    }
  }

  // Check left
  if (y != 0 && checkedMap[x][y - 1] != 1) {
    let validRoute = height < rows[x][y - 1] && rows[x][y - 1] != 9;
    if (validRoute) {
      checkedMap[x][y - 1] = 1;
      childCount++;
      childCount += countChildPoints(x, y - 1, checkedMap);
    }
  }

  // Check right
  if (y != yLength - 1 && checkedMap[x][y + 1] != 1) {
    let validRoute = height < rows[x][y + 1] && rows[x][y + 1] != 9;
    if (validRoute) {
      checkedMap[x][y + 1] = 1;
      childCount++;
      childCount += countChildPoints(x, y + 1, checkedMap);
    }
  }

  return childCount;
}


function countChildPoints(x, y, checkedMap) {
  let childCount = 0;
  let height = rows[x][y];

  if (height == 9) {
    return 0;
  }

  // Check above
  if (x != 0 && checkedMap[x - 1][y] != 1) {
    let validRoute = height < rows[x - 1][y] && rows[x - 1][y] != 9;
    if (validRoute) {
      checkedMap[x - 1][y] = 1;
      childCount++;
      childCount += countChildPoints(x - 1, y, checkedMap);
    }
  }

  // Check below
  if (x != xLength - 1 && checkedMap[x + 1][y] != 1) {
    let validRoute = height < rows[x + 1][y] && rows[x + 1][y] != 9;
    if (validRoute) {
      checkedMap[x + 1][y] = 1;
      childCount++;
      childCount += countChildPoints(x + 1, y, checkedMap);
    }
  }

  // Check left
  if (y != 0 && checkedMap[x][y - 1] != 1) {
    let validRoute = height < rows[x][y - 1] && rows[x][y - 1] != 9;
    if (validRoute) {
      checkedMap[x][y - 1] = 1;
      childCount++;
      childCount += countChildPoints(x, y - 1, checkedMap);
    }
  }

  // Check right
  if (y != yLength - 1 && checkedMap[x][y + 1] != 1) {
    let validRoute = height < rows[x][y + 1] && rows[x][y + 1] != 9;
    if (validRoute) {
      checkedMap[x][y + 1] = 1;
      childCount++;
      childCount += countChildPoints(x, y + 1, checkedMap);
    }
  }

  return childCount;
}

function printResult() {
  results.sort((a,b) => b-a);

  console.log(results[0]);
  console.log(results[1]);
  console.log(results[2]);

  console.log(results[0] * results[1] * results[2]);
}

lineReader.on('close', function () {
  checkAllDepths();
  printResult();
});