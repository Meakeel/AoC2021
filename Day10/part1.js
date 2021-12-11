let rows = [];
let corruptResults = [];
let incompleteResults = [];

let count = 0;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day10/input.txt')
});

lineReader.on('line', function (line) {
  rows.push(line.split(""));
});

function filterIncomplete() {
  rows = rows.filter(x => x.length % 2 == 0);
}

function loopInput() {
  // let input = '[<>({}){}[([])<>]][]'.split("");

  // let test = interesting('[<>({}){}[([])<>]][]'.split(""));

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let isValid = interesting(row);
    if (isValid === true) {
      incompleteResults.push(i)
    } else {
      corruptResults.push(isValid);
    }
  }

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
    
  console.log(resultCount);
};

function interesting(row) {
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

  return true;
}

function countTest(row) {
  let a = 0;
  let b = 0;
  let c = 0;
  let d = 0;

  for (let i = 0; i < row.length; i++) {
    let char = row[i];

    switch (char) {
      case "(":
        a++;
        break;
      case ")":
        a--;
        break;
      case "[":
        b++;
        break;
      case "]":
        b--;
        break;
      case "{":
        c++;
        break;
      case "}":
        c--;
        break;
      case "<":
        d++;
        break;
      case ">":
        d--;
        break;
    }

    if (a < 0) {
      return 3;
    }

    if (b < 0) {
      return 57;
    }

    if (c < 0) {
      return 1197;
    }

    if (d < 0) {
      return 25137;
    }

    return 0;
  }
}

function processRow(row) {
  let chunks = findParentChuncks(row);

  if (chunks == 0) {
    // Why did it go wrong?
  }

  for (let j = 0; j < chunks.length; j++) {
    let chunk = chunks[j];

    let result = checkSymmetry(chunk);

    if (result != true) {
      // Stop chunks loop as we have reported this.
      corruptResults.push(result);
      return;
    }
  }
}

function findParentChuncks(input) {
  // let input = '{([( <{}[<>[]}> {[]{[(<()>'.split(""); // Expected ], but found } instead.

  let firstChar = null;
  let firstCharIndex = null;
  let firstChunckCount = null;
  let chunks = [];

  for (let i = 0; i < input.length; i++) {
    let char = input[i];

    if (firstChar == null) {
      firstChar = input[i];
      firstCharIndex = i;
      firstChunckCount = 1;
      continue;
    }

    if (char == firstChar) {
      firstChunckCount++;
    }

    if (char == closing(firstChar)) {
      firstChunckCount--;
    }

    if (firstChunckCount == 0) {
      // We have a chunk
      chunks.push(input.slice(firstCharIndex, i + 1));
      firstChar = null;
      firstChunckCount = null;
      firstCharIndex = null;
    }

    if (i == input.length - 1) {
      let test = 'test';
    }
  }

  return chunks;
}

function checkSymmetry(chunk) {
  for (let i = 0; i < chunk.length / 2; i++) {
    if (chunk[i] != closing(chunk[chunk.length - i])) {
      // Invalid
      return chunk[i];
    }
  }

  return true;
}

function doSomething() {
  // If a chunk opens with (, it must close with ).
  // If a chunk opens with [, it must close with ].
  // If a chunk opens with {, it must close with }.
  // If a chunk opens with <, it must close with >.

  // valid
  // let input = '[<>({}){}[([])<>]]'.split("");
  let input = '{([( <{}[<>[]}> {[]{[(<()>'.split(""); // Expected ], but found } instead.
  mapped = Array(input.length).fill(0);
  let running = true;

  let count = 0;
  while (running) {
    for (let i = 0; i < input.length; i++) {
      // Already mapped so onto the next char
      if (mapped[i] == 1) {
        continue;
      }

      let char = input[i];
      let secondCharPos = getNextChar(i, input);
      let secondChar = input[secondCharPos];

      if (isMatch(char, secondChar)) {
        mapped[i] = 1;
        mapped[secondCharPos] = 1;
      }
    }

    count++;

    if (count == 50) {
      console.log("too many tries");
      running = false;
    }
  }


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

function isMatch(firstChar, secondChar) {
  switch (firstChar) {
    case "(":
      return secondChar == ")";
    case "[":
      return secondChar == "]";
    case "{":
      return secondChar == "}";
    case "<":
      return secondChar == ">";

    default:
      break;
  }
}

function getNextChar(i, input) {
  let startingPos = i + 1;
  for (let j = startingPos; j < input.length; j++) {
    // Already mapped go on to check the next char
    if (mapped[j] == 1) {
      continue;
    }

    return j;
  }
}

function printResult() {
  console.log(corruptResults.reduce((x, y) => x + y));
}

lineReader.on('close', function () {
  // filterIncomplete();
  loopInput();
  // printResult();
});

class ChunkRow {
  constructor(row) {
    this.isCorrupt = null;
    this.isIncomplete = null;
    // Array of chars in row
    this.row = row;

    this.chunks = [];
  }

  buildChildren() {
    let chunk = new Chunk(0, this.row);

    for (let i = 1; i < this.row.length; i++) {
      let closed = chunk.read(i);

      if (closed) {
        this.chunks.push(chunk);
        chunk = new Chunk(i + 1, this.row);
        i++;
      }
    }
  }
}

class Chunk {
  constructor(startingPos, row) {
    this.row = row;
    this.startingChar = row[startingPos];
    this.startingPos = startingPos;
  }

  buildChunk() {
    // [<>({}){}[([])<>]][]

    // Chunk > Chunck > close > Chunk > Chunk > close

  }

  read(i) {
    const char = this.row[i];

    if (this.isOpening(char)) {

    } else {
      // Is valid closing?
    }
  }

  isOpening(char) {
    if (char == "(" || char == "[" || char == "{" || char == "<") {
      return true;
    }

    return false;
  }
}

class ChildChunck {
  constructor() {

  }
}

function test() {
  let input = '[<>({}){}[([])<>]][]'.split("");

  let bob = new ChunkRow(input);
  let bobTue = bob.buildChildren();

  for (let i = 1; i < input.length; i++) {
    let char = array[i];



  }
}

// test();