let fishs = [];

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day6/input.txt')
});


lineReader.on('line', function (line) {
  fishs = Array(9).fill(0)
  let fishes = line.split(",").map(str => Number(str));

  for (let i = 0; i < fishes.length; i++) {
    let numberOfFish = fishes.filter(x => x == i);

    fishs[i] = numberOfFish.length;
  }
});

function age() {
  let numberOfDays = 256;

  for (let i = 0; i < numberOfDays; i++) {
    ageFish();
  }
}

function ageFish() {
  let newFishs = Array(9).fill(0);
  let babyFish = 0;

  for (let i = 0; i < 9; i++) {
    // if (fishs[i] === 0) {
    //   continue;
    // }

    // Move to 8, and move 8 to 7
    if (i == 0) {
      babyFish = fishs[i];
      continue;
    }

    if (i === 8) {
      // Move new fishes back into the count 
      newFishs[7] = fishs[8];   
      newFishs[8] = babyFish;
      newFishs[6] = newFishs[6] + babyFish;
    } else {
      newFishs[i - 1] = fishs[i];
    }
  }

  fishs = newFishs;
}


function printResult() {
  let count = 0;

  for (let i = 0; i < fishs.length; i++) {
    count = count + fishs[i];
  }
  console.log(count);
}

lineReader.on('close', function () {
  age();
  printResult();
});