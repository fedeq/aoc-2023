const input = require("fs").readFileSync("input.txt", "utf8").split("\n");

const games = input.map((line) => {
  // get game id, each line starts with Game <id>:
  const gameId = line.match(/Game (\d+):/)[1];
  // remove get id and separate the rest of the string by ;
  const sets = line.replace(/Game \d+: /, "").split("; ");
  console.log(sets);

  // exmaple game: 6 blue, 6 green, 9 red; 4 blue, 9 red, 3 green; 3 blue, 8 red
  return {
    id: +gameId,
    sets: sets.map((set) => ({
      red: set.match(/(\d+) red/)?.[1] || 0,
      blue: set.match(/(\d+) blue/)?.[1] || 0,
      green: set.match(/(\d+) green/)?.[1] || 0,
    })),
  };
});

const redCubes = 12;
const greenCubes = 13;
const blueCubes = 14;

const result = games.reduce((curr, { id, sets }) => {
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

console.log(games);
console.log(result);
