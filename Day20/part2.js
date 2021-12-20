let imageEnhancementAlgorithm = "#.#.####.####.#.#.#.....##.#..#####...##..#.#..#.####.#.#...#.#.#.#...#########.#.....#.#...##.##.#.####...##.#..##..##.###.##...#.#.#.##.##.#.#.#..#..#..#..##..##..##..#.#...#.#...#..#....#....#.##.##..###.....####.#.####...########.#.##.#.#.#.....#..##..##..###....#.###..###......#..#####..##..#..#.##..#..#..##.#.###.#.....#....#..####..####....#..##.#..####.#...##.###..#.....###..#..#..##...#####.#.....#..##..##..####.###.#.##..####.###.##...##..#...###.####...###....###.#..#.#.####.#...##.......##...#..";
let image = [];

function process() {
  let isHashInf = false;

  for (let i = 0; i < 50; i++) {
    enhanceImage(isHashInf);
    isHashInf = !isHashInf; 
  }
  
  countImage();
}

function enhanceImage(isHashInf) {
  let outputImage = [];
  expandImage(isHashInf);

  let length = image[0].length;
  for (let i = 0; i < image.length; i++) {
    outputImage.push(Array(length).fill(" "));
  }

  for (let rowIndex = 0; rowIndex < image.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < length; columnIndex++) {
      let square = getSquare(rowIndex, columnIndex, isHashInf);
      let binaryIndex = getBinary(square);

      let newPixel = imageEnhancementAlgorithm[binaryIndex];
      outputImage[rowIndex][columnIndex] = newPixel;

    }
  }
  // console.table(outputImage);
  image = outputImage;
}

function expandImage(isHashInf) {
  let char = isHashInf ? "#" : ".";

  for (let i = 0; i < image.length; i++) {
    image[i].unshift(char);
    image[i].push(char);
  }

  let length = image[0].length;
  image.unshift(Array(length).fill(char));
  image.push(Array(length).fill(char));
}

function getSquare(rowIndex, columnIndex, isHashInf) {
  let maxRow = image.length - 1;
  let maxColumn = image[0].length - 1;

  let char = isHashInf ? "#" : ".";

  let top = "";
  if (rowIndex == 0) {
    top = `${char}${char}${char}`;
  } else if (columnIndex == 0) {
    top = `${char}${image[rowIndex -1][columnIndex]}${image[rowIndex - 1][columnIndex + 1]}`;
  } else if (columnIndex == maxColumn) {
    top = `${image[rowIndex - 1][columnIndex - 1]}${image[rowIndex -1][columnIndex]}${char}`;
  } else {
    top = `${image[rowIndex - 1][columnIndex - 1]}${image[rowIndex -1][columnIndex]}${image[rowIndex - 1][columnIndex + 1]}`;
  }

  let middle = "";
  if (columnIndex == 0) {
    middle = `${char}${image[rowIndex][columnIndex]}${image[rowIndex][columnIndex + 1]}`;
  } else if (columnIndex == maxColumn) {
    middle = `${image[rowIndex][columnIndex - 1]}${image[rowIndex][columnIndex]}${char}`;
  } else {
    middle = `${image[rowIndex][columnIndex - 1]}${image[rowIndex][columnIndex]}${image[rowIndex][columnIndex + 1]}`;
  }


  let bottom = "";
  if (rowIndex == maxRow) {
    bottom = `${char}${char}${char}`;
  } else if (columnIndex == 0) {
    bottom = `${char}${image[rowIndex + 1][columnIndex]}${image[rowIndex + 1][columnIndex + 1]}`;
  } else if (columnIndex == maxColumn) {
    bottom = `${image[rowIndex + 1][columnIndex - 1]}${image[rowIndex + 1][columnIndex]}${char}`;
  } else {
    bottom = `${image[rowIndex + 1][columnIndex - 1]}${image[rowIndex + 1][columnIndex]}${image[rowIndex + 1][columnIndex + 1]}`;
  }

  return `${top}${middle}${bottom}`;
}

function getBinary(squareString) {
  let binaryString = squareString.replace(/\./g, "0").replace(/\#/g, "1");

  return parseInt(binaryString, 2);
}

function countImage() {
  let count = 0;

  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      if (image[i][j] == "#") {
        count++;
      }

    }
  }
  console.log(count);
}


let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day20/input.txt')
});

lineReader.on('line', function (line) {
  image.push(line.split(""));
});

lineReader.on('close', function () {
  process();
});

// test();

function test() {
  imageEnhancementAlgorithm = '..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#'.split("");
  
  image = [
    "#..#.".split(""),
    "#....".split(""),
    "##..#".split(""),
    "..#..".split(""),
    "..###".split("")
  ];
  
  process();

}