let snailFishRows = [];
let snailFishResult = null;

function testCases() {
  let testOneResult = "[[[[1,1],[2,2]],[3,3]],[4,4]]";

  snailFishRows =
    `[1,1]
  [2,2]
  [3,3]
  [4,4]`.replace(/ /g, "").split("\n");

  process();
  console.log(`Test 1 ${snailFishResult == testOneResult}`);

  let testTwoResult = "[[[[3,0],[5,3]],[4,4]],[5,5]]";

  snailFishRows =
    `[1,1]
  [2,2]
  [3,3]
  [4,4]
  [5,5]`.replace(/ /g, "").split("\n");;

  process();
  console.log(`Test 2 ${snailFishResult == testTwoResult}`);

  let testThreeResult = "[[[[5,0],[7,4]],[5,5]],[6,6]]";

  snailFishRows =
    `[1,1]
  [2,2]
  [3,3]
  [4,4]
  [5,5]
  [6,6]`.replace(/ /g, "").split("\n");

  process();
  console.log(`Test 3 ${snailFishResult == testThreeResult}`);


  let testFourResult = `[[[[0,7],4],[[7,8],[6,0]]],[8,1]]`

  snailFishRows =
    `[[[[4,3],4],4],[7,[[8,4],9]]]
  [1,1]`.replace(/ /g, "").split("\n");

  process();
  console.log(`Test 4 ${snailFishResult == testFourResult}`);

  snailFishRows =
    `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
  [7,[[[3,7],[4,3]],[[6,3],[8,8]]]]`.replace(/ /g, "").split("\n");

  let testFiveResult = `[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]`;

  process();
  console.log(`Test 5 ${snailFishResult == testFiveResult}`);


  snailFishRows =
    `[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]
  [[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]`.replace(/ /g, "").split("\n");

  let testSixResult = `[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]`;

  process();
  console.log(`Test 6 ${snailFishResult == testSixResult}`);

  snailFishRows =
    `[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]
  [[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]`.replace(/ /g, "").split("\n");

  let testSevenResult = `[[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]`;

  process();
  console.log(`Test 7 ${snailFishResult == testSevenResult}`);

  snailFishRows =
    `[[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]
  [7,[5,[[3,8],[1,4]]]]`.replace(/ /g, "").split("\n");

  let testEightResult = `[[[[7,7],[7,8]],[[9,5],[8,7]]],[[[6,8],[0,8]],[[9,9],[9,0]]]]`;

  process();
  console.log(`Test 8 ${snailFishResult == testEightResult}`);

  snailFishRows =
    `[[[[7,7],[7,8]],[[9,5],[8,7]]],[[[6,8],[0,8]],[[9,9],[9,0]]]]
  [[2,[2,2]],[8,[8,1]]]`.replace(/ /g, "").split("\n");

  let testNineResult = `[[[[6,6],[6,6]],[[6,0],[6,7]]],[[[7,7],[8,9]],[8,[8,1]]]]`;

  process();
  console.log(`Test 9 ${snailFishResult == testNineResult}`);

  snailFishRows =
    `[[[[6,6],[6,6]],[[6,0],[6,7]]],[[[7,7],[8,9]],[8,[8,1]]]]
  [2,9]`.replace(/ /g, "").split("\n");

  let testTenResult = `[[[[6,6],[7,7]],[[0,7],[7,7]]],[[[5,5],[5,6]],9]]`;

  process();
  console.log(`Test 10 ${snailFishResult == testTenResult}`);

  snailFishRows =
    `[[[[6,6],[7,7]],[[0,7],[7,7]]],[[[5,5],[5,6]],9]]
  [1,[[[9,3],9],[[9,0],[0,7]]]]`.replace(/ /g, "").split("\n");

  let testElevenResult = `[[[[7,8],[6,7]],[[6,8],[0,8]]],[[[7,7],[5,0]],[[5,5],[5,6]]]]`;

  process();
  console.log(`Test 11 ${snailFishResult == testElevenResult}`);

  snailFishRows =
    `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
  [7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
  [[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
  [[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
  [7,[5,[[3,8],[1,4]]]]
  [[2,[2,2]],[8,[8,1]]]
  [2,9]
  [1,[[[9,3],9],[[9,0],[0,7]]]]
  [[[5,[7,4]],7],1]
  [[[[4,2],2],6],[8,7]]`.replace(/ /g, "").split("\n");

  let testFullResult = `[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]`;

  process();
  console.log(`Test Full ${snailFishResult == testFullResult}`);

  console.log(`Magnitude test 1 ${processMagnitude("[9,1]") == 29}`);
  console.log(`Magnitude test 2 ${processMagnitude("[1,9]") == 21}`);
  console.log(`Magnitude test 3 ${processMagnitude("[[9,1],[1,9]]") == 129}`);
  console.log(`Magnitude test 4 ${processMagnitude("[[1,2],[[3,4],5]]") == 143}`);
  console.log(`Magnitude test 5 ${processMagnitude("[[[[0,7],4],[[7,8],[6,0]]],[8,1]]") == 1384}`);
  console.log(`Magnitude test 6 ${processMagnitude("[[[[1,1],[2,2]],[3,3]],[4,4]]") == 445}`);
  console.log(`Magnitude test 7 ${processMagnitude("[[[[3,0],[5,3]],[4,4]],[5,5]]") == 791}`);
  console.log(`Magnitude test 8 ${processMagnitude("[[[[5,0],[7,4]],[5,5]],[6,6]]") == 1137}`);
  console.log(`Magnitude test 9 ${processMagnitude("[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]") == 3488}`);

  snailFishRows =
    `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
  [[[5,[2,8]],4],[5,[[9,9],0]]]
  [6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
  [[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
  [[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
  [[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
  [[[[5,4],[7,7]],8],[[8,3],8]]
  [[9,3],[[9,9],[6,[4,9]]]]
  [[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
  [[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`.replace(/ /g, "").split("\n");

  let fullMagnitudeTestResult = "[[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]";
  process();
  console.log(`Magnitude Test Process ${snailFishResult == fullMagnitudeTestResult}`)
  console.log(`Magnitude Test ${processMagnitude(snailFishResult) == 4140}`);
}

function process() {
  for (let i = 0; i < snailFishRows.length; i++) {
    if (i == 0) {
      addSnailFishRows(snailFishRows[i], snailFishRows[i + 1]);
      reduceSnailFish();
    } else if (i != snailFishRows.length - 1) {
      addSnailFishRows(snailFishResult, snailFishRows[i + 1]);
      reduceSnailFish();
    }
  }
}

function processMagnitude(input) {
  // The magnitude of a pair is 3 times the magnitude of its left element plus 2 times the magnitude of its right element. 
  // The magnitude of a regular number is just that number.

  let processing = true;

  while (processing) {
    let pair = input.match(/\[\d{1,4},\d{1,3}\]/);

    if (pair == null) {
      processing = false;
      break;
    }

    let leftSide = input.slice(0, pair.index);
    let rightSide = input.slice(pair.index + pair[0].length);
    let magnitude = pair[0].replace("[", "").replace("]", "").split(",").reduce((x, y) => (Number(x) * 3) + (Number(y) * 2));

    input = `${leftSide}${magnitude}${rightSide}`;
  }

  return Number(input);
  // [[1,2],[[3,4],5]] becomes 143.
  // [[[[0,7],4],[[7,8],[6,0]]],[8,1]] becomes 1384.
  // [[[[1,1],[2,2]],[3,3]],[4,4]] becomes 445.
  // [[[[3,0],[5,3]],[4,4]],[5,5]] becomes 791.
  // [[[[5,0],[7,4]],[5,5]],[6,6]] becomes 1137.
  // [[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]] becomes 3488.
}

function addSnailFishRows(rowOne, rowTwo) {
  snailFishResult = `[${rowOne},${rowTwo}]`
}

function reduceSnailFish() {
  let anyFound = true;
  let steps = [];

  while (anyFound) {
    steps.push(snailFishResult);
    if (steps.length == 3) {
      // debugger;
    }
    anyFound = false;

    let counter = 0;

    // Always explode first
    for (let i = 0; i < snailFishResult.length; i++) {
      // early exit for last char

      if (snailFishResult[i] == "[") {
        counter++;
      }

      if (counter == 5) {
        // Explode
        explode(i);
        anyFound = true;
        break;
      }

      if (snailFishResult[i] == "]") {
        counter--;
      }
    }

    // if we found any explosions then check again for explosions before doing any splits
    if (anyFound) {
      continue;
    }

    for (let i = 0; i < snailFishResult.length; i++) {
      // 2 digit number
      let value = Number(snailFishResult[i] + snailFishResult[i + 1]);
      if (!Number.isNaN(value) && value >= 10) {
        split(value, i);
        anyFound = true;
        break;
      }
    }
  }
}

function explode(index) {
  // next number
  let indexOfNextNumber = snailFishResult.slice(index).search(/\d/) + index;
  let firstValue = Number(snailFishResult[indexOfNextNumber] + snailFishResult[indexOfNextNumber + 1]);
  if (Number.isNaN(firstValue)) {
    firstValue = Number(snailFishResult[indexOfNextNumber]);
  }

  let indexOfSecond = indexOfNextNumber + firstValue.toString().length + 1;
  let secondValue = Number(snailFishResult[indexOfSecond] + snailFishResult[indexOfSecond + 1]);
  if (Number.isNaN(secondValue)) {
    secondValue = Number(snailFishResult[indexOfSecond]);
  }

  // Build object to show the start / end that needs to be replaced with a 0
  let pairDetails = {
    startingIndex: indexOfNextNumber - 1,
    pairLength: (firstValue.toString() + secondValue.toString()).length + 3 // 3 - adding the non digits [,] 
  };

  let leftResults = findToTheLeft(firstValue, indexOfNextNumber);
  let rightResults = findToTheRight(secondValue, indexOfSecond);
  buildNewString(leftResults, rightResults, pairDetails);
}

function findToTheLeft(firstValue, indexOfNextNumber) {
  // Any commas to the left?
  let indexOfLeftMatch = null;
  for (let i = indexOfNextNumber; i > 0; i--) {
    const char = snailFishResult[i];

    if (char == ",") {
      indexOfLeftMatch = i;
      break;
    }
  }

  if (indexOfLeftMatch == null) {
    return null;
  }

  let indexOfLeftMatchNumber = snailFishResult.slice(0, indexOfLeftMatch).search(/\d(?!.*\d)/);

  let originalLength = 2;
  let startingIndex = indexOfLeftMatch - 2;
  let value = Number(snailFishResult[indexOfLeftMatchNumber - 1] + snailFishResult[indexOfLeftMatchNumber]);
  if (Number.isNaN(value)) {
    value = Number(snailFishResult[indexOfLeftMatchNumber]);
    startingIndex = indexOfLeftMatch - 1;
    originalLength = 1;
  }

  return {
    startingIndex: startingIndex,
    originalLength: originalLength,
    newValue: firstValue + value,
    indexOfStartOfNumber: originalLength == 1 ? indexOfLeftMatchNumber : indexOfLeftMatchNumber - 1
  };
}

function findToTheRight(secondValue, indexOfSecond) {

  // Any commas to the right?
  let indexOfSecondMatch = null;
  for (let i = indexOfSecond; i < snailFishResult.length; i++) {
    const char = snailFishResult[i];

    if (char == ",") {
      indexOfSecondMatch = i;
      break;
    }
  }

  if (indexOfSecondMatch == null) {
    return null;
  }

  let indexOfSecondMatchNumber = indexOfSecondMatch + snailFishResult.slice(indexOfSecondMatch).search(/\d/);

  let originalLength = 2;
  let startingIndex = indexOfSecondMatch + 2;
  let value = Number(snailFishResult[indexOfSecondMatchNumber] + snailFishResult[indexOfSecondMatchNumber + 1]);
  if (Number.isNaN(value)) {
    value = Number(snailFishResult[indexOfSecondMatchNumber]);
    startingIndex = indexOfSecondMatch + 1;
    originalLength = 1;
  }

  return {
    startingIndex: startingIndex,
    originalLength: originalLength,
    newValue: secondValue + value,
    indexOfStartOfNumber: indexOfSecondMatchNumber
  };
}

function buildNewString(leftResults, rightResults, pairDetails) {
  if (rightResults != null) {
    let leftSide = snailFishResult.slice(0, rightResults.indexOfStartOfNumber);
    let rightSide = snailFishResult.slice(rightResults.indexOfStartOfNumber + rightResults.originalLength);
    snailFishResult = `${leftSide}${rightResults.newValue}${rightSide}`
  }

  if (pairDetails != null) {
    let leftSide = snailFishResult.slice(0, pairDetails.startingIndex);
    let rightSide = snailFishResult.slice(pairDetails.startingIndex + pairDetails.pairLength);
    snailFishResult = `${leftSide}0${rightSide}`
  }

  if (leftResults != null) {
    let leftSide = snailFishResult.slice(0, leftResults.indexOfStartOfNumber);
    let rightSide = snailFishResult.slice(leftResults.indexOfStartOfNumber + leftResults.originalLength);
    snailFishResult = `${leftSide}${leftResults.newValue}${rightSide}`
  }
}

function buildNewStringOld(leftResults, rightResults, pairDetails) {
  let leftString = null;
  if (leftResults != null) {

    if (leftResults.startingIndex != leftResults.indexOfStartOfNumber) {
      debugger;

      // 14 -17
      // '[[[[4,0],[5,0]],[[[4,5],[2,6]],[9,5]]],[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]]'
      //                ----   

      // '[[[[4,0],[5,0]4,[['
      let bitBetweenPairAndValue = snailFishResult.slice(pairDetails.startingIndex + pairDetails.pairLength, rightResults.startingIndex + 1);
      leftString = `${snailFishResult.slice(0, leftResults.indexOfStartOfNumber)}${leftResults.newValue}${snailFishResult.slice(leftResults.indexOfStartOfNumber + leftResults.originalLength, pairDetails.startingIndex)}`

    } else {
      leftString = `${snailFishResult.slice(0, leftResults.startingIndex)}${leftResults.newValue}${snailFishResult.slice(leftResults.startingIndex + leftResults.originalLength, pairDetails.startingIndex)}`
    }

  } else {
    leftString = snailFishResult.slice(0, pairDetails.startingIndex);
  }

  let middleString = null;
  if (leftString[leftString.length - 1] == ",") {
    middleString = "0";
  } else {
    middleString = "0,";
  }


  let pair = snailFishResult.slice(pairDetails.startingIndex, pairDetails.startingIndex + pairDetails.pairLength);

  //                        [6,7] remove
  //                             ]]],[ -- keep
  //                                  1=new value - swap
  //                                    ,1]] - keep
  // '[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]'

  let rightString = null;
  if (rightResults != null) {
    if (rightResults.startingIndex != rightResults.indexOfStartOfNumber) {
      // We don't have anything in the middle ie [[[
      if (snailFishResult[rightResults.startingIndex] == "[" && rightResults.indexOfStartOfNumber - rightResults.startingIndex == 1) {
        rightString = `${rightResults.newValue}${snailFishResult.slice(rightResults.indexOfStartOfNumber + rightResults.originalLength)}`;
      } else {
        let bitBetweenPairAndValue = snailFishResult.slice(pairDetails.startingIndex + pairDetails.pairLength, rightResults.startingIndex + 1);

        rightString = `${bitBetweenPairAndValue}${rightResults.newValue}${snailFishResult.slice(rightResults.indexOfStartOfNumber + rightResults.originalLength)}`;
      }

    } else {
      rightString = `${rightResults.newValue}${snailFishResult.slice(rightResults.startingIndex + rightResults.originalLength)}`
    }

  } else {
    rightString = snailFishResult.slice(pairDetails.startingIndex + pairDetails.pairLength);
  }

  let newString = `${leftString}${middleString}${rightString}`;
  snailFishResult = newString;

  // console.log(isValid);

  // after explode:  [[[[0,7],4],[7,[[8,4],9]]],[1,1]]
  // after explode:  [[[[0,7],4],[15,[0,13]]],[1,1]]
  // after split:    [[[[0,7],4],[[7,8],[0,13]]],[1,1]]
  // after split:    [[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]
  // after explode:  [[[[0,7],4],[[7,8],[6,0]]],[8,1]]

  // if (
  //   newString == "[[[[0,7],4],[7,[[8,4],9]]],[1,1]]" ||
  //   newString == "[[[[0,7],4],[15,[0,13]]],[1,1]]" ||
  //   newString == "[[[[0,7],4],[[7,8],[0,13]]],[1,1]]" ||
  //   newString == "[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]" ||
  //   newString == "[[[[0,7],4],[[7,8],[6,0]]],[8,1]]"
  // ) {
  //   console.log("valid");
  // } else {
  //   debugger;
  // }
}

function split(value, index) {
  let leftString = snailFishResult.slice(0, index);
  let rightString = snailFishResult.slice(index + 2);

  let leftValue = Math.floor(value / 2);
  let rightValue = Math.ceil(value / 2);

  snailFishResult = `${leftString}[${leftValue},${rightValue}]${rightString}`;
}

// snailFishResult = "[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]";

// for (let i = 0; i < 5; i++) {
//   reduceSnailFish();
// }



// // snailFishResult = "[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]";
// snailFishResult = "[[[[0,7],4],[7,[[8,4],9]]],[1,1]]";
// reduceSnailFish();
// console.log(snailFishResult);

// after explode:  [[[[0,7],4],[7,[[8,4],9]]],[1,1]]
// after explode:  [[[[0,7],4],[15,[0,13]]],[1,1]]
// after split:    [[[[0,7],4],[[7,8],[0,13]]],[1,1]]
// after split:    [[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]
// after explode:  [[[[0,7],4],[[7,8],[6,0]]],[8,1]]

// process();

// testCases();

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day18/input.txt')
});

lineReader.on('line', function (line) {
  snailFishRows.push(line);
});

lineReader.on('close', function () {
  process();
  console.log(`Magnitude: ${processMagnitude(snailFishResult)}`);
});