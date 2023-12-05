const { isSymbol } = require("util");

const input = require("fs").readFileSync("input.txt", "utf8").split("\n");

const matrix = input.map((row) =>
  row.split("").filter((char) => char !== "\r")
);

const numbers = [];
const numbersMap = new Map();
let id = 0;

for (let i = 0; i < input.length; i++) {
  const row = input[i];
  let currentNumber = "";
  for (let j = 0; j < row.length; j++) {
    const char = row[j];
    if (isNumberChar(char)) {
      currentNumber += char;
    }
    if (isSymbolChar(char) || char == ".") {
      if (currentNumber.length > 0) {
        let newNumber = { number: currentNumber, id: id++ };
        numbers.push[newNumber];
        numbersMap.set(newNumber.id, newNumber.number);
        storeFullNumber(newNumber, i, j);
      }
      currentNumber = "";
    }
  }
  if (currentNumber.length > 0) {
    let newNumber = { number: currentNumber, id: id++ };
    numbers.push[newNumber];
    numbersMap.set(newNumber.id, newNumber.number);
    storeFullNumber(newNumber, i, input[i].length);
  }
}

function storeFullNumber(number, row, col) {
  // console.log(`Storing ${number} at ${row}, ${col}`);
  const numberLength = number.number.length;
  for (i = 0; i < numberLength; i++) {
    matrix[row][col - numberLength + i] = number;
  }
}

numsToSum = new Set();

for (let i = 0; i < input.length; i++) {
  const row = input[i];
  for (let j = 0; j < row.length; j++) {
    const char = row[j];
    if (isSymbolChar(char)) {
      addAdjacentPositions(i, j);
    }
  }
}

function addAdjacentPositions(row, col) {
  // also consider diagonals and check for out of bounds
  const positions = [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1],
  ];

  for (let i = 0; i < positions.length; i++) {
    const [row, col] = positions[i];
    if (row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length) {
      const elem = matrix[row][col];
      if (elem.hasOwnProperty("id")) {
        numsToSum.add(elem.id);
      }
    }
  }
}

console.log(numsToSum);
total = [...numsToSum].reduce(
  (acc, curr) => acc + Number(numbersMap.get(curr)),
  0
);

console.log(total);

function isSymbolChar(char) {
  // consider a symbol anything different to a number or '.'
  return !isNumberChar(char) && char !== ".";
}

function isNumberChar(char) {
  return !isNaN(char);
}
