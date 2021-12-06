let fishs = [];

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day6/input.txt')
});


lineReader.on('line', function (line) {
  fishs = line.split(",").map(str => Number(str));
});

function age() {
  let numberOfDays = 80;

  for (let i = 0; i < numberOfDays; i++) {
    ageFish();
  }
}

function ageFish() {
  let numberOfFishes = fishs.length;
  for (let i = 0; i < numberOfFishes; i++) {

    if (fishs[i] == 0) {
      fishs.push(8);
      fishs[i] = 6;
      continue;
    }
    
    fishs[i]--;
  }
}


function printResult() {
  console.log(fishs.length);
}

lineReader.on('close', function () {
  age();
  printResult();
});