const input = require("fs").readFileSync("input.txt", "utf8").split("\n");

const games = input.map((line) => {
  // get game id, each line starts with Game <id>:
  const gameId = line.match(/Game (\d+):/)[1];
  // remove get id and separate the rest of the string by ;
  const sets = line.replace(/Game \d+: /, "").split("; ");
  console.log(sets);

  const game = {
    id: +gameId,
    sets: sets.map((set) => ({
      red: set.match(/(\d+) red/)?.[1] || 0,
      blue: set.match(/(\d+) blue/)?.[1] || 0,
      green: set.match(/(\d+) green/)?.[1] || 0,
    })),
  };
  const maxRed = Math.max(...game.sets.map(({ red }) => red));
  const maxBlue = Math.max(...game.sets.map(({ blue }) => blue));
  const maxGreen = Math.max(...game.sets.map(({ green }) => green));
  game.power =
    Math.max(maxRed, 1) * Math.max(maxBlue, 1) * Math.max(maxGreen, 1);
  return game;
});

const redCubes = 12;
const greenCubes = 13;
const blueCubes = 14;

const part1 = games.reduce((curr, { id, sets }) => {
  if (
    sets.every(({ red, green, blue }) => {
      if (red > redCubes || green > greenCubes || blue > blueCubes) {
        console.log(`Game ${id} is invalid`);
        return false;
      }
      return true;
    })
  ) {
    return curr + id;
  }
  return curr;
}, 0);

const part2 = games.reduce((curr, { power }) => {
  return curr + power;
}, 0);

console.log(games);

console.log(part1);
console.log(part2);
