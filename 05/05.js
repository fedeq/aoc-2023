const fs = require("fs");

function parseMappingSection(lines) {
  const ranges = lines.map((line) => {
    const [destStart, srcStart, length] = line.split(" ").map(Number);
    return { destStart, srcStart, length };
  });

  return (num) => {
    for (const { destStart, srcStart, length } of ranges) {
      if (num >= srcStart && num < srcStart + length) {
        return destStart + (num - srcStart);
      }
    }
    return num;
  };
}

function processInput(fileName) {
  const content = fs.readFileSync(fileName, "utf8").replace(/\r\n/g, "\n");
  const sections = content.split("\n\n");

  const seeds = sections[0].split(": ")[1].split(" ").map(Number);

  const mappings = sections.slice(1).map((section) => {
    const lines = section
      .split("\n")
      .slice(1)
      .filter((line) => line.trim().length > 0);
    return parseMappingSection(lines);
  });

  function getLocationNumber(seed) {
    return mappings.reduce((num, mapFunc) => mapFunc(num), seed);
  }

  return Math.min(...seeds.map(getLocationNumber));
}

// Usage
const lowestLocationNumber = processInput("input.txt");
console.log("Lowest Location Number:", lowestLocationNumber);
