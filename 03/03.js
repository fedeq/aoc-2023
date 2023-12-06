const { isSymbol } = require("util");

const input = require("fs").readFileSync("input.txt", "utf8").split("\n");

const matrix = input.map((row) =>
  row.split("").filter((char) => char !== "\r")
);

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
        numbersMap.set(newNumber.id, newNumber.number);
        storeFullNumber(newNumber, i, j);
      }
      currentNumber = "";
    }
  }
  if (currentNumber.length > 0) {
    let newNumber = { number: currentNumber, id: id++ };
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

const part1 = () => {
  numsToSum = new Set();

  for (let i = 0; i < input.length; i++) {
    const row = input[i];
    for (let j = 0; j < row.length; j++) {
      const char = row[j];
      if (isSymbolChar(char)) {
        adjacents = getAdjacentPositions(i, j);
        for (const [row, col] of adjacents) {
          const elem = matrix[row][col];
          if (elem.hasOwnProperty("id")) {
            numsToSum.add(elem.id);
          }
        }
      }
    }
  }

  return [...numsToSum].reduce(
    (acc, curr) => acc + Number(numbersMap.get(curr)),
    0
  );
};

function getAdjacentPositions(row, col) {
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

  return positions.filter(
    ([row, col]) =>
      row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length
  );
}

function isSymbolChar(char) {
  return !isNumberChar(char) && char !== ".";
}

function isNumberChar(char) {
  return !isNaN(char);
}

function part2() {
  // Part 2
  numsToSum2 = [];

  for (let i = 0; i < input.length; i++) {
    const row = input[i];
    for (let j = 0; j < row.length; j++) {
      const char = row[j];
      if (char === "*") {
        checkIfGear(i, j);
      }
    }
  }

  function checkIfGear(row, col) {
    const positions = getAdjacentPositions(row, col);

    let nums = new Set();

    for (let i = 0; i < positions.length; i++) {
      const [row, col] = positions[i];
      const elem = matrix[row][col];
      if (elem.hasOwnProperty("id")) {
        nums.add(elem.id);
      }
    }

    if (nums.size == 2) {
      // console.log(
      //   `${numbersMap.get([...nums][0])} * ${numbersMap.get([...nums][1])} = ${
      //     numbersMap.get([...nums][0]) * numbersMap.get([...nums][1])
      //   }`
      // );
      numsToSum2.push(
        numbersMap.get([...nums][0]) * numbersMap.get([...nums][1])
      );
    }
  }

  return numsToSum2.reduce((acc, curr) => Number(acc) + Number(curr), 0);
}

console.log(part1());
console.log(part2());
