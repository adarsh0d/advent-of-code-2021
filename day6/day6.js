const fs = require('fs-extra');
const sum = (array) => array.reduce((total, i) => total + i, 0);

function noOfFish(fishes, numDays) {
  const queue = new Array(7).fill(0);
  for (let day = 0; day < numDays; day++) {
    queue[(day + 9) % 7] += fishes[day % 7];
    fishes[day % 7] += queue[day % 7];
    queue[day % 7] = 0;
  }
  return sum(fishes) + sum(queue);
}
const fishes = new Array(7).fill(0);
fs.readFile('input.txt', 'utf-8', (err, s) => {
    s.split(',').map(Number).forEach((n) => {
        fishes[n] += 1;
      });
    console.log(fishes);
    console.log(noOfFish(fishes, 256));
})