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

  let processing = true;
  let index = 0;
  let versionCount = 0;

  while (processing) {
    let newPacket = new Packet(index, bits);
    index = newPacket.endingIndex;
    processing = newPacket.isLastPacket;
    versionCount += newPacket.version;
    packets.push(newPacket);

    console.log('packet');
  }

  console.log(versionCount);
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
    
    // literal
    this.value = null;

    // Operator
    this.lengthId = null;

    this.process();
  }

  process() {
    this.readVersion();
    this.readPacketType();
    this.readData();

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
      case 4:
         this.value = this.readLiteralValue();
        break;

      default:
        this.readOperator();
        break;
    }
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
        let value = this.readData();

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
        let value = this.readData();
      }      
    }

    // If the length type ID is 1, then the next 11 bits are a number that represents the number of sub-packets immediately contained by this packet.
  }

  binaryToDecimal(str) {
    return parseInt(str, 2);
  }
}

// Every packet begins with a standard header: the first three bits encode the packet version
// and the next three bits encode the packet type ID. These two values are numbers; all numbers encoded in any packet are represented as binary with the most significant bit first. For example, a version encoded as the binary sequence 100 represents the number 4.

// Packets with type ID 4 represent a literal value

lineReader.on('close', function () {
  process();
  // printResult();
});