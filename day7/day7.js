const fs = require('fs-extra');

function part1(input) {
    const max = Math.max(...input);
    const min = Math.min(...input);
    const sums = []
    for(let i = min; i<=max; i++) {
       const output = input.reduce((acc, a) => {
            acc += Math.abs(parseInt(a)-i);
            return acc
        }, 0)

        sums.push(output)
    }
    
    console.log(Math.min(...sums))
}
function part2(input) {
    const max = Math.max(...input);
    const min = Math.min(...input);
    const sums = []
    for(let i = min; i<=max; i++) {
       const output = input.reduce((acc, a, j) => {
            const diff = Math.abs(parseInt(a)-i)
            acc += (diff*(diff+1))/2;
            return acc
        }, 0)

        sums.push(output)
    }
    console.log(Math.min(...sums))
}
fs.readFile('input.txt', 'utf-8', (err, s) => {
    const input = s.split(',').map(Number);
    console.log(part1(input));
    console.log(part2(input));
})