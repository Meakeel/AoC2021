let depths = [];
let previousDepth = null;
let count = 0;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day1/input.txt')
});


lineReader.on('line', function (line) {
  let value = parseInt(line)
  if(previousDepth == null) {
    previousDepth = value;
    depths.push(value);
    return;
  }

  if (value > previousDepth) {
    count++;
  }

  previousDepth = value;
  depths.push(value);
});

function printResult() {
  console.log(count);
}

lineReader.on('close', function () {
  printResult();
});
