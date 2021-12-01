let depths = [];
let combinedDepths = [];
let previousDepth = null;
let count = 0;
let total = 0

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day1/input.txt')
});


lineReader.on('line', function (line) {
  let value = parseInt(line)
  depths.push(value);
});

function combine() {
  for (let i = 0; i < depths.length; i++) {
    if (i == depths.length - 2 || i == depths.length - 1) {
      continue;
    }

      combinedDepths.push(depths[i] + depths[i + 1] + depths[i + 2]);
  }
}

function calculate() {
  combinedDepths.forEach(depth => {
    if (previousDepth == null) {
      previousDepth = depth;
      return;
    }

    if (depth > previousDepth) {
      count++;
    }

    previousDepth = depth;
  });
}

function printResult() {
  console.log(count);
}

lineReader.on('close', function () {
  combine();
  calculate()
  printResult();
});