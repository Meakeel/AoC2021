let template = [];
let rules = [];
let calc = [];
let counts = {};

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

function createPairsRules() {
  for (let i = 0; i < rules.length; i++) {
    calc[rules[i][0]] = 0;
  }
}

function process() {
  setTemplatePairs();

  for (let i = 0; i < 40; i++) {
    increasePairsCount();
  }
}

function setTemplatePairs() {
  for (let i = 0; i < template.length - 1; i++) {
    let toMatch = template[i] + template[i + 1];

    calc[toMatch]++;
  }
}

function increasePairsCount() {
  let pairs = Object.keys(calc);

  let snapshot = [];
  for (let i = 0; i < pairs.length; i++) {
    snapshot[pairs[i]] = calc[pairs[i]];
  }

  let results = [];

  for (let i = 0; i < pairs.length; i++) {
    if (snapshot[pairs[i]] == 0) {
      continue;
    }

    results.push(...increasePairCount(pairs[i], snapshot));
  }

  for (let i = 0; i < pairs.length; i++) {
    calc[pairs[i]] = 0;
  }

  for (let i = 0; i < results.length; i++) {
    calc[results[i][0]] += results[i][1];
  }
}

function increasePairCount(pair, snapshot) {
  // we don't currently have any of this pair
  if (snapshot[pair] == 0) {
    return;
  }

  let rule = rules.filter(x => x[0] == pair)[0];
  // 00 01     1   00 1 01      00 1    1 01
  // NN     -> C --> NCN      | NC    | CN 
  let one = rule[0][0] + rule[1];
  let two = rule[1] + rule[0][1];

  let results = [];
  results.push([one, snapshot[pair]]);
  results.push([two, snapshot[pair]]);

  return results;
}

function printResult(obj) {
  let results = Object.values(counts);

  console.log(Math.max.apply(null, results) - Math.min.apply(null, results));
}

function countValues() {
  let result = {};

  for (let pair in calc) {
    if (result[pair[0]] == undefined) {
      result[pair[0]] = calc[pair];
    } else {
      result[pair[0]] = result[pair[0]] + calc[pair];
    }

    if (result[pair[1]] == undefined) {
      result[pair[1]] = calc[pair];
    } else {
      result[pair[1]] = result[pair[1]] + calc[pair];
    }
  }

  // Add the first and last letters as they aren't included in the pairs
  result[template[0]] += 1;
  result[template[template.length - 1]] += 1;

  for (let char in result) {
    result[char] =  result[char] / 2;
  }

  counts = result;
}

lineReader.on('close', function () {
  createPairsRules();
  process();
  countValues();
  printResult();
});