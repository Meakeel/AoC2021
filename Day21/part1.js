let imageEnhancementAlgorithm = "#.#.####.####.#.#.#.....##.#..#####...##..#.#..#.####.#.#...#.#.#.#...#########.#.....#.#...##.##.#.####...##.#..##..##.###.##...#.#.#.##.##.#.#.#..#..#..#..##..##..##..#.#...#.#...#..#....#....#.##.##..###.....####.#.####...########.#.##.#.#.#.....#..##..##..###....#.###..###......#..#####..##..#..#.##..#..#..##.#.###.#.....#....#..####..####....#..##.#..####.#...##.###..#.....###..#..#..##...#####.#.....#..##..##..####.###.#.##..####.###.##...##..#...###.####...###....###.#..#.#.####.#...##.......##...#..";
let image = [];

function process(playerOne, playerTwo) {
  let dice = {
    nextRoll: 0,
    countRoll: 0
  };

  let winner = false;

  while (!winner) {
    let playerOneRoll = getDiceRoll(dice);
    movePlayer(playerOne, playerOneRoll);
    if (checkWinner(playerOne)) {
      winner = true;      
      
      console.log(`Number Rolled:${dice.countRoll} times, Player 1 Won, Player 2 Lost Score: ${playerTwo.score} | result ${playerTwo.score * dice.countRoll}`);

      continue;
    }

    let playerTwoRoll = getDiceRoll(dice);
    movePlayer(playerTwo, playerTwoRoll);
    if (checkWinner(playerTwo)) {
      winner = true;

      console.log(`Number Rolled:${dice.countRoll} times, Player 2 Won, Player 1 Lost Score: ${playerOne.score} | result ${playerOne.score * dice.countRoll}`);
      continue;
    }

  }


}

function getDiceRoll(dice) {
  roll = getNextDiceNumber(dice) + getNextDiceNumber(dice) + getNextDiceNumber(dice);
  dice.countRoll += 3;

  return roll;
}

function getNextDiceNumber(dice) {
  if (dice.nextRoll == 101) {
    dice.nextRoll = 1;
  }
  dice.nextRoll += 1;

  return dice.nextRoll;
}

function movePlayer(player, playerRoll) {
  let mod = (player.position + playerRoll) % 10;

  if (mod == 0) {
    player.position = 10;
  } else {
    player.position = mod;
  }

  console.log(`Player ${player.name} rolled a ${playerRoll} and moved to ${player.position}`);

  player.score += player.position;
}

function checkWinner(player) {
  if (player.score >= 1000) {
    return true;
  }

  return false;
}


let playerOne = {
  name: "one",
  position: 7,
  score: 0
};
let playerTwo = {
  name: "two",
  position: 4,
  score: 0
};

process(playerOne, playerTwo);