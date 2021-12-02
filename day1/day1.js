const fs = require('fs-extra');

function countIncreasesInDepth(input) {
    return input.filter((a, i, arr) => a > arr[i-1]).length;
}
function countIncreasesInWindow(input) {
    const output = input.map((number, i, arr) => {
        return arr[i] + arr[i+1] + arr[i+2];
    }, []);
    return countIncreasesInDepth(output);
}

fs.readFile('input.txt', 'utf-8', (err, s) => {
    const data = s.split('\n').map(Number);
    console.log(countIncreasesInDepth(data))
    console.log(countIncreasesInWindow(data))
})
