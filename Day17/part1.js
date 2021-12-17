var highestProbe = {
  position: [0, 0],
  height: 0
};

// Test
// target area: x=20..30, y=-10..-5
let testTargetArea = {
  x: [20, 30],
  y: [-10, -5]
}

// Live
// target area: x=124..174, y=-123..-86
let targetArea = {
  x: [124, 174],
  y: [-86, 123]
}

function testCases() {
  let probeOne = new Probe(7, 2, testTargetArea);
  probeOne.runProbe(); // hit
  let probeTwo = new Probe(6, 3, testTargetArea)
  probeTwo.runProbe(); // hit
  let probeThree = new Probe(9, 0, testTargetArea)
  probeThree.runProbe(); // hit
  let probeFour = new Probe(17, -4, testTargetArea);
  probeFour.runProbe(); // miss
  let probeFive = new Probe(6, 9, testTargetArea);
  probeFive.runProbe(); // hit -- highest


  if (probeOne.hitTarget && probeTwo.hitTarget && probeThree.hitTarget && !probeFour.hitTarget && probeFive.hitTarget) {
    console.log("all valid");
    return true;
  }

  console.log('highest height ' + highestProbe.height);

  return false;
}

function process() {
  testCases();

  for (let i = 0; i < targetArea.x[1]; i++) {
    for (let j = 0; j < targetArea.y[1]; j++) {
      new Probe(i, j, targetArea).runProbe();
    }
  }

  console.log(highestProbe);
}


class Probe {
  constructor(x, y, targetArea) {
    this.highest = 0;
    this.position = [0, 0];
    this.xVelocity = x;
    this.yVelocity = y;

    this.targetXMin = targetArea.x[0];
    this.targetXMax = targetArea.x[1];

    this.targetYMin = targetArea.y[0];
    this.targetYMax = targetArea.y[1];

    this.hitTarget = false;
    this.dead = false;
  }

  step() {
    // The probe's x position increases by its x velocity.
    // The probe's y position increases by its y velocity.
    // Due to drag, the probe's x velocity changes by 1 toward the value 0; that is, it decreases by 1 if it is greater than 0, increases by 1 if it is less than 0, or does not change if it is already 0.
    // Due to gravity, the probe's y velocity decreases by 1.
    this.position[0] += this.xVelocity;
    this.position[1] += this.yVelocity;

    this.highest = this.position[1] > this.highest ? this.position[1] : this.highest;


    if (this.xVelocity > 0) {
      this.xVelocity--;
    }

    if (this.xVelocity < 0) {
      this.xVelocity++;
    }

    this.yVelocity--;

    this.checkPosition();
  }

  checkPosition() {
    let validX = false;
    let validY = false;

    if (this.position[0] <= this.targetXMax && this.position[0] >= this.targetXMin) {
      validX = true;
    }

    if (this.position[1] <= this.targetYMax && this.position[1] >= this.targetYMin) {
      validY = true;
    }

    if (validX && validY) {
      this.hitTarget = true;
      return;
    }

    // Check out of bounds
    if (this.position[1] < this.targetYMin) {
      this.dead = true;
    }
  }

  runProbe() {
    while (!this.dead) {
      this.step();
    }
    console.log(this.hitTarget ? 'Its a hit' : 'Its a miss');

    if (this.hitTarget) {
      if (this.highest > highestProbe.height) {
        highestProbe.position = this.position;
        highestProbe.height = this.highest;
      }
    }
  }
}

process();