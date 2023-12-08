const input = require("fs").readFileSync("input.txt", "utf8").split("\n");

function part1() {
  const cards = input.map((card) => {
    const { winningNumbers, ownNumbers } = getNumbersFromCard(card);
    const matches = ownNumbers.filter((num) => winningNumbers.includes(num));
    const score = matches.length > 0 ? Math.pow(2, matches.length - 1) : 0;
    return { card, matches, score };
  });

  const totalScore = cards.reduce((curr, { score }) => curr + score, 0);
  return totalScore;
}

function getNumbersFromCard(card) {
  const newCard = card.replace(/Card \d+: /, "").split(" | ");
  const winningNumbers = newCard[0].trim().split(/\s+/).map(Number);
  const ownNumbers = newCard[1].trim().split(/\s+/).map(Number);

  return { winningNumbers, ownNumbers };
}

console.log(part1());

function part2() {
  const cards = input.map((card, index) => {
    const { winningNumbers, ownNumbers } = getNumbersFromCard(card);
    const matches = ownNumbers.filter((num) => winningNumbers.includes(num));
    return { amount: 1, matches };
  });

  // Update amount of each card
  for (let i = 0; i < cards.length; i++) {
    card = cards[i];
    for (let j = i + 1; j <= i + card.matches.length; j++) {
      const otherCard = cards[j];
      otherCard.amount += card.amount;
    }
  }

  const totalAmount = cards.reduce((curr, { amount }) => curr + amount, 0);
  return totalAmount;
}

console.log(part2());
