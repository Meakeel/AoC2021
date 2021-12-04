const { exit } = require('process');

let cards = [[]];
let inputs = [];
let marks = [];
let boardMarks = [];

let result = [];

let countResult = 0;
let numberCalledResult = 0;

let currentCard = 0;

let cardReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day4/input-cards.txt')
});

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day4/input.txt')
});

lineReader.on('line', function (line) {
  inputs = line.split(",").map(str => Number(str));
});

cardReader.on('line', function (line) {
  // start a new card
  if (line.trim() == "") {
    cards.push([]);
    currentCard++;
    return;
  }

  cards[currentCard].push(line.match(/\d{1,2}/g).map(str => Number(str)));
});

function buildMarkCards() {
  let numbers = [0,0,0,0,0];
  for (let i = 0; i < cards.length; i++) {
    let card = [[...numbers],[...numbers],[...numbers],[...numbers],[...numbers]];
    marks.push(card);
    boardMarks.push(0);
  }
}

function checkResults() {
  inputs.forEach(input => {
    for (let i = 0; i < cards.length; i++) {
      let currentCard = cards[i];

      for (let j = 0; j < currentCard.length; j++) {
        let currentLine = currentCard[j];

        for (let k = 0; k < currentLine.length; k++) {
          let currentValue = currentLine[k];
          
          if (input === currentValue) {
            markMatch(i, j, k);
            if (checkForWinner(i, j, k, input)) {
              markBoard(i);
              checkForLastBoard();
              console.log('WINNER');
            };
          }
        }
        
      }
      
    }
  });
}

function markMatch(card, row, position) {
  marks[card][row][position] = 1;
}

function markBoard(card) {
  boardMarks[card] = 1;
}

function checkForLastBoard() {
  // This is the last board to get filled
  if (boardMarks.filter(x => x === 0).length === 0) {
    let lastBoard = result.slice(-1);

    console.log(lastBoard);
    console.log(lastBoard[0][4] * lastBoard[0][5]);

    exit();
  }
}

function checkForWinner(card, row, position, numberCalled) {
  // check for a row win
  let count = 0;
  for (let i = 0; i < 5; i++) {
    count = count + marks[card][row][i];
  }

  if (count == 5) {
    result.push(['Row', card, row, position, numberCalled, countUnMarked(card)]);
    return true;
  }

  // check for a line win
  count = 0
  for (let i = 0; i < 5; i++) {
    count = count + marks[card][i][position];
  }

  if (count == 5) {
    result.push(['Line', card, row, position, numberCalled, countUnMarked(card)]);
    return true;
  }

  return false;
}

function countUnMarked(card) {
  let count = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (marks[card][i][j] === 0) {
        count = count + cards[card][i][j];
      }
    }
    
  }
  return count;
}

lineReader.on('close', function () {
  buildMarkCards();
  checkResults();
});