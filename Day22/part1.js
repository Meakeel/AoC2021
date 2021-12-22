let targetAreaRule = "x=-50..50,y=-50..50,z=-50..50";

let targetArea = {
  x: {
    min: -50,
    max: 50
  },
  y: {
    min: -50,
    max: 50
  },
  z: {
    min: -50,
    max: 50
  }
};

let testRules =
  `on x=10..12,y=10..12,z=10..12
on x=11..13,y=11..13,z=11..13
off x=9..11,y=9..11,z=9..11
on x=10..10,y=10..10,z=10..10`.split("\n");

let rules = [

];

let results = [];

function processRule(rule) {
  let isOn = rule.substring(0, 2) == "on";

  let xInstruction = findStartAndEnd("x", rule);
  let yInstruction = findStartAndEnd("y", rule);
  let zInstruction = findStartAndEnd("z", rule);

  for (let x = xInstruction.start; x <= xInstruction.end; x++) {
    for (let y = yInstruction.start; y <= yInstruction.end; y++) {
      for (let z = zInstruction.start; z <= zInstruction.end; z++) {
        results[`${x},${y},${z}`] = isOn ? 1 : 0;
      }
    }

  }
}

function findStartAndEnd(toFind, rule) {
  let split = rule.split(toFind);
  let end = split[1].indexOf(",");
  let values = split[1].substring(1, end == -1 ? split[1].length : end).split("..");

  let valueOne = Number(values[0]);
  let valueTwo = Number(values[1]);

  if (valueTwo < valueOne) {
    let tempValueOne = JSON.parse(JSON.stringify(valueOne));
    let tempValueTwo = JSON.parse(JSON.stringify(valueTwo));

    valueOne = tempValueTwo;
    valueTwo = tempValueOne;
  }

  if (valueOne < targetArea[toFind].min) {
    valueOne = targetArea[toFind].min;
  }

  if (valueTwo > targetArea[toFind].max) {
    valueTwo = targetArea[toFind].max;
  }

  return {
    start: valueOne,
    end: valueTwo
  };
}

function processTests() {
  testRules.forEach(rule => {
    processRule(rule);
    print();
  });
}

function process() {
  rules.forEach(rule => {
    processRule(rule);
  });

  printResult();
}

function print() {
  let pairs = Object.keys(results);

  pairs.forEach(pair => {
    console.log(pair);
  });

  printResult();
}

function printResult() {
  let resultsValue = Object.values(results);
  let resultsCount = resultsValue.filter(x => x == 1);
  console.log(`Number of on cubes = ${resultsCount.length}`)
}

// processTests();



let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day22/input.txt')
});

lineReader.on('line', function (line) {
  rules.push(line);
});

lineReader.on('close', function () {
  process();
});