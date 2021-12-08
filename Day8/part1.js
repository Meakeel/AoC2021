let inputAndOutput = [];

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

    let tempResult = [];
    for (let k = 0; k < row[1].length; k++) {
      let value = row[1][k].length;

      if (value == 2 || value == 3 || value == 4 || value == 7) {
        count ++;
      }

      if (tempResult[value] == undefined) {
        tempResult[value] = 1;
      } else {
        tempResult[value]++;
      }
    }
  }

  console.log(count);
}


lineReader.on('close', function () {
  sort();
  count();
});