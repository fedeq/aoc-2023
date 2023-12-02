// open input.txt file and transform it to array of string
const input = require("fs").readFileSync("input.txt", "utf8").split("\n");
// const input = require("fs")
//   .readFileSync("exampleInput.txt", "utf8")
//   .split("\n");

const getNumbers = (mapSpelledDigits = false) => {
  const regex = mapSpelledDigits
    ? /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g
    : /(?=(\d))/g;
  return input.map((line) =>
    [...line.matchAll(regex)]
      .map((match) => match[1])
      .map((num) => {
        if (num === "one") return 1;
        if (num === "two") return 2;
        if (num === "three") return 3;
        if (num === "four") return 4;
        if (num === "five") return 5;
        if (num === "six") return 6;
        if (num === "seven") return 7;
        if (num === "eight") return 8;
        if (num === "nine") return 9;
        return +num;
      })
  );
};

const result = (numbers) =>
  numbers.reduce((curr, lineNums) => {
    if (lineNums.length === 0) return curr;
    if (lineNums.length === 1)
      return curr + Number(`${lineNums[0]}${lineNums[0]}`);
    return curr + Number(`${lineNums[0]}${lineNums[lineNums.length - 1]}`);
  }, 0);

const part1 = result(getNumbers(false));
const part2 = result(getNumbers(true));
console.log(part1);
console.log(part2);
