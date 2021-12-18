let snailFishRows = [];
let snailFishResult = null;

function testCases() {
  let testOne = "[[[[1,1],[2,2]],[3,3]],[4,4]]";

  let testOneResult =
    `[1,1]
  [2,2]
  [3,3]
  [4,4]`;

  let testTwo = "[[[[3,0],[5,3]],[4,4]],[5,5]]";

  let testTwoResult =
    `[1,1]
  [2,2]
  [3,3]
  [4,4]
  [5,5]`;

  let testThree = "[[[[5,0],[7,4]],[5,5]],[6,6]]";

  let testThreeResult =
    `[1,1]
  [2,2]
  [3,3]
  [4,4]
  [5,5]
  [6,6]`;

  let testFour =
    `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
  [7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
  [[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
  [[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
  [7,[5,[[3,8],[1,4]]]]
  [[2,[2,2]],[8,[8,1]]]
  [2,9]
  [1,[[[9,3],9],[[9,0],[0,7]]]]
  [[[5,[7,4]],7],1]
  [[[[4,2],2],6],[8,7]]`;

  let testFourResult = `[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]`;


  // Magnitude 

  // [[1,2],[[3,4],5]] becomes 143.
  // [[[[0,7],4],[[7,8],[6,0]]],[8,1]] becomes 1384.
  // [[[[1,1],[2,2]],[3,3]],[4,4]] becomes 445.
  // [[[[3,0],[5,3]],[4,4]],[5,5]] becomes 791.
  // [[[[5,0],[7,4]],[5,5]],[6,6]] becomes 1137.
  // [[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]] becomes 3488.

}

function process() {
  let input = `[1,1]
  [2,2]
  [3,3]
  [4,4]`.split("\n");

  for (let i = 0; i < input.length; i++) {
    snailFishRows.push(input[i].trim());

  }

  for (let i = 0; i < snailFishRows.length; i++) {
    if (i == 0) {
      addSnailFishRows(snailFishRows[i], snailFishRows[i + 1]);
      reduceSnailFish();
    } else if (i != snailFishRows.length - 1) {
      addSnailFishRows(snailFishResult, snailFishRows[i + 1]);
      reduceSnailFish();
    }
  }

  console.log(snailFishResult);
}

function addSnailFishRows(rowOne, rowTwo) {
  snailFishResult = `[${rowOne},${rowTwo}]`
}

function reduceSnailFish() {
  // To reduce a snailfish number, you must repeatedly do the first action in this list that applies to the snailfish number:

  //   If any pair is nested inside four pairs, the leftmost such pair explodes.
  //   If any regular number is 10 or greater, the leftmost such regular number splits.

  // WHILE LOOP HERE -- if no matches in a loop then exit

  let counter = 0;
  for (let i = 0; i < snailFishResult.length; i++) {
    // early exit for last char

    if (snailFishResult[i] == "[") {
      counter++;
    }

    if (counter == 4) {
      // Explode
      explode(i);
      break;
    }

    if (snailFishResult[i] == "]") {
      counter--;
    }

    // 2 digit number
    let value = Number(snailFishResult[i] + snailFishResult[i + 1]);
    if (!Number.isNaN(value) && value >= 10) {
      split(i);
      break;
    }
  }
  // During reduction, at most one action applies, after which the process returns to the top of the list of actions. For example, if split produces a pair that meets the explode criteria, that pair explodes before other splits occur.
}

function explode(index) {
  // To explode a pair, the pair's left value is added to the first regular number to the left of the exploding pair (if any), 
  // and the pair's right value is added to the first regular number to the right of the exploding pair (if any). 
  // Exploding pairs will always consist of two regular numbers. 
  // Then, the entire exploding pair is replaced with the regular number 0.

  // Here are some examples of a single explode action:

  //     [[[[[9,8],1],2],3],4] becomes [[[[0,9],2],3],4] (the 9 has no regular number to its left, so it is not added to any regular number).
  //     [7,[6,[5,[4,[3,2]]]]] becomes [7,[6,[5,[7,0]]]] (the 2 has no regular number to its right, and so it is not added to any regular number).
  //     [[6,[5,[4,[3,2]]]],1] becomes [[6,[5,[7,0]]],3].
  //     [[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]] becomes [[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]] (the pair [3,2] is unaffected because the pair [7,3] is further to the left; 
        // [3,2] would explode on the next action).
  //     [[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]] becomes [[3,[2,[8,0]]],[9,[5,[7,0]]]].



  console.log('I exploded');
}

function explodeLeft(index) {
  
}

function explodeRight(index) {
  
}

function split(params) {
  //   To split a regular number, replace it with a pair; the left element of the pair should be the regular number divided by two and rounded down, while the right element of the pair should be the regular number divided by two and rounded up. For example, 10 becomes [5,5], 11 becomes [5,6], 12 becomes [6,6], and so on.

  // Here is the process of finding the reduced result of [[[[4,3],4],4],[7,[[8,4],9]]] + [1,1]:

  // after addition: [[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]
  // after explode:  [[[[0,7],4],[7,[[8,4],9]]],[1,1]]
  // after explode:  [[[[0,7],4],[15,[0,13]]],[1,1]]
  // after split:    [[[[0,7],4],[[7,8],[0,13]]],[1,1]]
  // after split:    [[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]
  // after explode:  [[[[0,7],4],[[7,8],[6,0]]],[8,1]]

}


snailFishResult = "[[[[[9,8],1],2],3],4]";
reduceSnailFish();

// process();



// let lineReader = require('readline').createInterface({
//   input: require('fs').createReadStream('Day18/test-input.txt')
// });

// lineReader.on('line', function (line) {
//   snailFishRows.push(line);
// });

// lineReader.on('close', function () {
//   process();
//   // printResult();
// });