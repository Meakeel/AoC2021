let inputAndOutput = [];
let results = [];

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day8/input.txt')
});


lineReader.on('line', function (line) {
  let leftAndRight = line.split(" | ");
  let array = [];
  array.push(leftAndRight[0].split(" "));
  array.push(leftAndRight[1].split(" "));

  inputAndOutput.push(array);
});

function sort() {
  for (let i = 0; i < inputAndOutput.length; i++) {
    let row = inputAndOutput[i];

    for (let j = 0; j < row.length; j++) {
      let values = row[j];

      for (let k = 0; k < values.length; k++) {
        values[k] = values[k].split('').sort().join('');
      }
    }
  }
}

function count() {
  let count = 0;

  for (let i = 0; i < inputAndOutput.length; i++) {
    let row = inputAndOutput[i];

    let resultDic = calculateNumbersFromInput(row[0]);
    let resultsArray = Object.keys(resultDic);

    let numberString = "";
    for (let i = 0; i < row[1].length; i++) {
      let output = row[1][i];

      for (let j = 0; j < resultsArray.length; j++) {
        if (output == resultsArray[j]) {
          numberString = numberString + j;
        }

      }
    }

    results.push(Number(numberString));
  }

  console.log(results.reduce((x, y) => x + y));
}

function calculateNumbersFromInput(input, output) {
  // Pass in the 10 inputs and work out which is which.

  // 1 - length 2
  // 4 - length 4
  // 7 - length 3
  // 8 - length 7
  let zero = null;
  let one = input.filter(x => x.length == 2)[0];
  let two = null;
  let three = null;
  let four = input.filter(x => x.length == 4)[0];
  let five = null;
  let six = null;
  let seven = input.filter(x => x.length == 3)[0];
  let eight = input.filter(x => x.length == 7)[0];
  let nine = null;

  let top = seven.split('').filter(x => !one.includes(x))[0];
  let bottom = null;
  let middle = null;
  let bottomLeft = null;

  let fourWithAHat = four + top;
  let zeroSixOrNine = input.filter(x => x.length == 6);
  let twoThreeOrFive = input.filter(x => x.length == 5);

  // Find 9
  for (let i = 0; i < zeroSixOrNine.length; i++) {
    let value = zeroSixOrNine[i];

    // 9 includes all of 4 with a hat
    let tempNine = value.split('').filter(x => !fourWithAHat.includes(x));

    if (tempNine.length == 1) {
      bottom = tempNine[0];
      nine = value;

      zeroSixOrNine.splice(i, 1);
    }
  }

  // find three - take 1 add top and bottom
  let findThree = one + top + bottom;

  for (let i = 0; i < twoThreeOrFive.length; i++) {
    let value = twoThreeOrFive[i];

    let tempThree = value.split('').filter(x => !findThree.includes(x));

    if (tempThree.length == 1) {
      middle = tempThree[0];
      three = value;

      twoThreeOrFive.splice(i, 1);
    }
  }

  // Find 0 
  // Take 8 and remove the middle
  let toRemoveFromEight = eight.indexOf(middle);
  let zeroArray = eight.split("");
  zeroArray.splice(toRemoveFromEight, 1);
  zero = zeroArray.join("");

  // 6 is wrong
  let zeroInArray = zeroSixOrNine.indexOf(zero);
  zeroSixOrNine.splice(zeroInArray, 1)
  six = zeroSixOrNine[0];


  // Find 5
  for (let i = 0; i < twoThreeOrFive.length; i++) {
    let value = twoThreeOrFive[i];

    let tempFive = six.split('').filter(x => !value.includes(x));

    if (tempFive.length == 1) {
      bottomLeft = tempFive[0];
      five = value;

      twoThreeOrFive.splice(i, 1);
    }
  }

  // Find 2 
  two = twoThreeOrFive[0];

  let resultsArray = [];
  resultsArray[zero] = 0;
  resultsArray[one] = 1;
  resultsArray[two] = 2;
  resultsArray[three] = 3;
  resultsArray[four] = 4;
  resultsArray[five] = 5;
  resultsArray[six] = 6;
  resultsArray[seven] = 7;
  resultsArray[eight] = 8;
  resultsArray[nine] = 9;

  return resultsArray;

  //   0:      1:      2:      3:      4:
  //   aaaa    ....    aaaa    aaaa    ....
  //  b    c  .    c  .    c  .    c  b    c
  //  b    c  .    c  .    c  .    c  b    c
  //   ....    ....    dddd    dddd    dddd
  //  e    f  .    f  e    .  .    f  .    f
  //  e    f  .    f  e    .  .    f  .    f
  //   gggg    ....    gggg    gggg    ....

  //    5:      6:      7:      8:      9:
  //   aaaa    aaaa    aaaa    aaaa    aaaa
  //  b    .  b    .  .    c  b    c  b    c
  //  b    .  b    .  .    c  b    c  b    c
  //   dddd    dddd    ....    dddd    dddd
  //  .    f  e    f  .    f  e    f  .    f
  //  .    f  e    f  .    f  e    f  .    f
  //   gggg    gggg    ....    gggg    gggg
}


lineReader.on('close', function () {
  sort();
  count();
});