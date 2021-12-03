let bits = [];
let bitCount = [];

let gamma = [];
let epsilon = [];

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day3/input.txt')
});


lineReader.on('line', function (line) {
  let biteArray = [];
  for (let i = 0; i < line.length; i++) {
    biteArray.push(parseInt(line[i]));    
  }

  bits.push(biteArray);
});

function countCommonBits() {
  let bitLength = bits[0].length;
  for (let j = 0; j < bitLength; j++) {
    bitCount[j] = 0;    
  }

  for (let i = 0; i < bits.length; i++) {
    let bitArray = bits[i];

    for (let k = 0; k < bitLength; k++) {
      bitCount[k] = bitCount[k] + bitArray[k];
    }
  }
}

function computeCommonBits() {  
  for (let i = 0; i < bitCount.length; i++) {
    // Common bit is a 1
    if (bitCount[i] > (bits.length / 2)) {
      gamma[i] = 1;
      epsilon[i] = 0;
    } else {
      gamma[i] = 0;
      epsilon[i] = 1;
    }    
  }
}

function computeDecimal(array) {
  let binaryString = array.join("");
  return parseInt(binaryString, 2);
}

function printResult() {
  console.log(computeDecimal(gamma));
  console.log(computeDecimal(epsilon));
  console.log(computeDecimal(epsilon) * computeDecimal(gamma));
}

lineReader.on('close', function () {
  countCommonBits();
  computeCommonBits();
  printResult();
});