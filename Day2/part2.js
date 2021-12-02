let depth = 0;
let horizontal = 0;
let aim = 0;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day2/input.txt')
});


lineReader.on('line', function (line) {
  let direction = line[0];

  switch (direction) {
    case 'u':
      aim = aim - parseInt(line.substr(3));
      break;
    case 'd':
      aim = aim + parseInt(line.substr(5));
    break;
    case 'f':
      let x = parseInt(line.substr(8));
      horizontal = horizontal + x;
      depth = depth + (aim * x);
    break;
    default:
      console.log('something went wrong with the direction');
      break;
  }
});

function printResult() {
  console.log('height is ' + depth);
  console.log('horizontal  is ' + horizontal);
  console.log('product is ' + horizontal * depth);
}

lineReader.on('close', function () {
  printResult();
});