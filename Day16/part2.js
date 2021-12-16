let hexArray = [];
let bits = [];
let packets = [];

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Day16/input.txt')
});

lineReader.on('line', function (line) {
  hexArray = line.match(/.{1,2}/g);
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

function process() {
  convertToBits();
  console.log(bits.join(""));

  let processing = true;
  let index = 0;
  let valueCount = 0;

  while (processing) {
    let newPacket = new Packet(index, bits);
    index = newPacket.endingIndex;
    processing = newPacket.isLastPacket;
    valueCount += newPacket.value;
    packets.push(newPacket);
  }

  console.log(valueCount);
}

function convertToBits() {
  hexArray.forEach(str => {
    bits.push(...hexTobinary(str));
  })
}

function hexTobinary(hex) {
  return (parseInt(hex, 16).toString(2)).padStart(8, '0').split("");
}

class Packet {
  constructor(index, bits) {
    this.children = [];
    this.bits = bits;
    this.startingIndex = index;
    this.endingIndex = null;
    this.isLastPacket = false;

    this.version = 0;
    this.packetType = 0;
    this.value = 0;

    this.process();
  }

  process() {
    this.readVersion();
    this.readPacketType();
    this.value = this.readData();

    this.endingIndex = this.startingIndex;

    if (this.endingIndex == this.bits.length) {
      this.isLastPacket = true;
    }
  }

  readVersion() {
    let versionStr = this.bits.slice(this.startingIndex, this.startingIndex + 3).join("");
    this.startingIndex += 3;
    this.version += this.binaryToDecimal(versionStr);
  }

  readPacketType() {
    let packetStr = this.bits.slice(this.startingIndex, this.startingIndex + 3).join("");
    this.startingIndex += 3;
    this.packetType = this.binaryToDecimal(packetStr);
  }

  readData() {
    switch (this.packetType) {
      case 0:
        return this.processSum();
        break;
      case 1:
        return this.processProduct();
        break;
      case 2:
        return this.processMinimum();
        break;
      case 3:
        return this.processMaximum();
        break;
      case 4:
        return this.readLiteralValue();
      case 5:
        return this.processGreaterThan();
        break;
      case 6:
        return this.processLessThan();
        break;
      case 7:
        return this.processEqualTo();
        break;
      default:
        this.readOperator(this.packetType);
        break;
    }
  }
  
  processSum() {
    // Packets with type ID 0 are sum packets - their value is the sum of the values of their sub-packets. If they only have a single sub-packet, their value is the value of the sub-packet.
    
    // V   T   ID    Length - 2    V    T  value  V   T   value
    // 110 000 1    00000000010    110 100 00001 010 100 00010
    let values = this.readOperator();
    return values.reduce((x,y) => x + y);
  }

  processProduct() {
    // Packets with type ID 1 are product packets - their value is the result of multiplying together the values of their sub-packets. If they only have a single sub-packet, their value is the value of the sub-packet.
    let values = this.readOperator();
    return values.reduce((x,y) => x * y);
  }

  processMinimum() {
    // Packets with type ID 2 are minimum packets - their value is the minimum of the values of their sub-packets.
    let values = this.readOperator();
    return Math.min(...values);
  }

  processMaximum() {
    // Packets with type ID 3 are maximum packets - their value is the maximum of the values of their sub-packets.
    let values = this.readOperator();
    return Math.max(...values);
  }

  processGreaterThan() {
    // Packets with type ID 5 are greater than packets - their value is 1 if the value of the first sub-packet is greater than the value of the second sub-packet; otherwise, their value is 0. These packets always have exactly two sub-packets.
    let values = this.readOperator();
    return values[0] > values[1] ? 1 : 0;
  }

  processLessThan() {
    // Packets with type ID 6 are less than packets - their value is 1 if the value of the first sub-packet is less than the value of the second sub-packet; otherwise, their value is 0. These packets always have exactly two sub-packets.
    let values = this.readOperator();
    return values[0] < values[1] ? 1 : 0;
  }

  processEqualTo() {
    // Packets with type ID 7 are equal to packets - their value is 1 if the value of the first sub-packet is equal to the value of the second sub-packet; otherwise, their value is 0. These packets always have exactly two sub-packets.
    let values = this.readOperator();
    return values[0] == values[1] ? 1 : 0;
  }

  readLiteralValue() {
    let processing = true;
    let returnValue = "";

    while (processing) {
      let lastValue = this.bits[this.startingIndex] == "0";
      this.startingIndex++;

      returnValue += this.bits.slice(this.startingIndex, this.startingIndex + 4).join("");
      this.startingIndex += 4;

      processing = !lastValue;
    }

    return this.binaryToDecimal(returnValue);
  }

  readOperator() {
    let lengthTypeId = this.bits[this.startingIndex];
    this.startingIndex += 1;

    let values = [];
    // If the length type ID is 0, then the next 15 bits are a number that represents the total length in bits
    if (lengthTypeId == "0") {
      let lengthOfPacketsStr = this.bits.slice(this.startingIndex, this.startingIndex + 15).join("");
      this.startingIndex += 15;
      let subPacketLength = this.binaryToDecimal(lengthOfPacketsStr);
      let targetEnd = this.startingIndex + subPacketLength;

      let processing = true;
      while (processing) {
        this.readVersion();
        this.readPacketType();
        values.push(this.readData());

        if (this.startingIndex == targetEnd) {
          processing = false;
        }
      }

    }

    if (lengthTypeId == "1") {
      let numberOfSubPacketsStr = this.bits.slice(this.startingIndex, this.startingIndex + 11).join("");
      this.startingIndex += 11;
      let numberOfSubPackets = this.binaryToDecimal(numberOfSubPacketsStr);

      for (let i = 0; i < numberOfSubPackets; i++) {
        this.readVersion();
        this.readPacketType();
        values.push(this.readData());
      }
    }

    return values;

    // If the length type ID is 1, then the next 11 bits are a number that represents the number of sub-packets immediately contained by this packet.
  }

  binaryToDecimal(str) {
    return parseInt(str, 2);
  }
}

lineReader.on('close', function () {
  process();
  // printResult();
});