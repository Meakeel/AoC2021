let rows = [];
let corruptResults = [];
let incompleteResults = [];
let completedResults = [];
let completedResultsCounted = [];
let corruptCount = 0;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day10/input.txt')
});

lineReader.on('line', function (line) {
  rows.push(line.split(""));
});

function loopInput() {
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let processResult = processRows(row);

    if (Array.isArray(processResult)) {
      incompleteResults.push(processResult);
    } else {
      corruptResults.push(processResult);
    }
  }
};

function calculateCorrupt() {
  let resultCount = 0;
  for (let i = 0; i < corruptResults.length; i++) {
    const result = corruptResults[i];

    if (result == ")") {
      resultCount += 3;
    }

    if (result == "]") {
      resultCount += 57;
    }

    if (result == "}") {
      resultCount += 1197;
    }

    if (result == ">") {
      resultCount += 25137;
    }
  }

  corruptCount = resultCount;
}

function calculateComplete() {
  // console.table(incompleteResults);

  for (let i = 0; i < incompleteResults.length; i++) {
    let row = incompleteResults[i];

    let reversed = row.reverse();

    let newRow = [];
    for (let j = 0; j < reversed.length; j++) {
      let char = reversed[j];
      newRow.push(closing(char));
    }

    completedResults.push(newRow);
  }

  // console.table(completedResults);
}

function processRows(row) {
  let openings = [];
  for (let i = 0; i < row.length; i++) {
    const element = row[i];

    if (validOpening(element)) {
      openings.push(element);
    } else {
      let closing = openings.pop();
      if (!validClosing(element, closing)) {
        return element;
      }
    }
  }

  if (openings.length > 0) {
    return openings;
  }

  return true;
}

function closing(char) {
  switch (char) {
    case "(":
      return ")";
    case "[":
      return "]";
    case "{":
      return "}";
    case "<":
      return ">";

    default:
      break;
  }
}

function validOpening(char) {
  if (char == "(" || char == "[" || char == "{" || char == "<") {
    return true;
  }

  return false;
}

function validClosing(closing, opening) {
  switch (opening) {
    case "(":
      return ")" == closing;
    case "[":
      return "]" == closing;
    case "{":
      return "}" == closing;
    case "<":
      return ">" == closing;

    default:
      break;
  }
}

function countComplete() {
  for (let i = 0; i < completedResults.length; i++) {
    let row = completedResults[i];

    let score = 0
    for (let j = 0; j < row.length; j++) {
      score = score * 5;

      let char = row[j];

      switch (char) {
        case ")":
          score += 1;
          break;
        case "]":
          score += 2;
          break;
        case "}":
          score += 3;
          break;
        case ">":
          score += 4;
          break;

        default:
          break;
      }

    }

    completedResultsCounted.push(score);
  }
}

function sortAndPrintMiddle() {
  let results = completedResultsCounted.sort((a,b) => b-a);
  let middle = (completedResultsCounted.length - 1) / 2;
  console.log(results[middle]);
}


function printResult() {
  console.log(corruptCount);
}

lineReader.on('close', function () {
  // filterIncomplete();
  loopInput();
  calculateComplete();
  calculateCorrupt();
  countComplete();
  sortAndPrintMiddle();
  printResult();
});