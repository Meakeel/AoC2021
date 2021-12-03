let bits = [];
let bitCount = [];

let oxygen = [];
let co2 = [];

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

function computeSomething() {
  let oxygenResults = [...bits];
  let co2Results = [...bits];

  // Filter oxygen results
  for (let i = 0; i < bitCount.length; i++) {
    let commonCount = countCommonBit(oxygenResults, i);
    let middle = oxygenResults.length / 2;

    let common =  null;
    if (middle == commonCount) {
      common = 1;
    } else {
      common = commonCount > (oxygenResults.length / 2) ? 1 : 0;
    }

    oxygenResults = filterResults(oxygenResults, common, i);

    if (oxygenResults.length === 1) {
      oxygen = oxygenResults[0];
      break;
    }
  }
  
  // Filter co2 results
  for (let i = 0; i < bitCount.length; i++) {
    let commonCount = countCommonBit(co2Results, i);
    let middle = co2Results.length / 2;
    let common = null;
    if (middle == commonCount) {
      common = 0;
    } else {
      common = commonCount > (co2Results.length / 2) ? 0 : 1;
    }

    co2Results = filterResults(co2Results, common, i);

    if (co2Results.length === 1) {
      co2 = co2Results[0];
      break;
    }
  }
}

function filterResults(array, value, position) {
  return array.filter((x) => x[position] === value);
}

function computeDecimal(array) {
  let binaryString = array.join("");
  return parseInt(binaryString, 2);
}

function printResult() {
  console.log(computeDecimal(oxygen));
  console.log(computeDecimal(co2));
  console.log(computeDecimal(oxygen) * computeDecimal(co2));
}

lineReader.on('close', function () {
  computeSomething();
  printResult();
});