const input = require("fs").readFileSync("input.txt", "utf8").split("\n");

const part1 = () => {
  const cards = input.map((card) => {
    const { winningNumbers, ownNumbers } = getNumbersFromCard(card);
    const matches = ownNumbers.filter((num) => winningNumbers.includes(num));
    const score = matches.length > 0 ? Math.pow(2, matches.length - 1) : 0;
    return { card, matches, score };
  });

  const totalScore = cards.reduce((curr, { score }) => curr + score, 0);
  return totalScore;
};

function getNumbersFromCard(card) {
  const newCard = card.replace(/Card \d+: /, "").split(" | ");
  const winningNumbers = newCard[0].trim().split(/\s+/).map(Number);
  const ownNumbers = newCard[1].trim().split(/\s+/).map(Number);

  return { winningNumbers, ownNumbers };
}

console.log(part1());
