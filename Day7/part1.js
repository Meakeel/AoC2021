let crabs = [];
let maxPostion = 0;
let results = [];

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day7/input.txt')
});


lineReader.on('line', function (line) {
  crabs = line.split(",").map(str => Number(str));
  
  maxPostion = crabs.reduce((previousValue, currentValue) => Math.max(previousValue, currentValue), 0);
  results = Array(maxPostion).fill(0);
});

function checkDistance(target) {
  let totalDistance = 0;
  for (let i = 0; i < crabs.length; i++) {
    totalDistance += Math.abs(target - crabs[i]);
  }

  results[target] = totalDistance;
}

function loop() {
  for (let i = 0; i < maxPostion; i++) {
    checkDistance(i);
  }
}


function printResult() {
  let minPostion = results.reduce((previousValue, currentValue) => Math.min(previousValue, currentValue));
  console.log(minPostion);
}

lineReader.on('close', function () {
  loop();
  printResult();
});