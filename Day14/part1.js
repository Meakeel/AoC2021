let template = [];
let rules = [];
let calc = [];

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day14/input.txt')
});

lineReader.on('line', function (line) {
  if (line == "") {
    return;
  }

  if (line.substring(3, 4) == "-") {
    let split = line.split(" -> ");
    rules.push([split[0], split[1]]);
    return;
  }

  template = line.split("");
});

function printResult() {
  for (let i = 0; i < template.length; i++) {
    if (calc[template[i]] == undefined) {
      calc[template[i]] = 1;
      continue;
    }

    calc[template[i]]++;
  }

  let results = Object.values(calc);

  console.log(Math.max.apply(null, results) - Math.min.apply(null, results));
}

function buildRulesIntoTemplate() {
  let toInsert = [];

  for (let i = 0; i < template.length; i++) {
    let toMatch = template[i] + template[i + 1];

    for (let j = 0; j < rules.length; j++) {
      const rule = rules[j];

      if (rule[0] == toMatch) {
        toInsert.push([rule[1], i + 1]);
      }
    }
  }

  insertRulesIntoTemplate(toInsert);
}

function insertRulesIntoTemplate(toInsert) {
  // First index rule
  let count = 0;

  for (let i = 0; i < toInsert.length; i++) {
    const rule = toInsert[i];

    index = rule[1] + count;
    template.splice(index, 0, rule[0]);

    count++;
  }
}

function process() {
  for (let i = 0; i < 10; i++) {
    buildRulesIntoTemplate();
  }
}

lineReader.on('close', function () {
  process();
  printResult();
});