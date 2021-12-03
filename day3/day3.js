const fs = require('fs-extra');

function findBits(input) {
    return input.reduce((acc, a) => {
        const bits = a.split('').map(Number);
        bits.forEach((bit, i) => {
            if(acc[i]) {
                acc[i].push(bit);
            } else {
                acc.push([bit])
            }
        })
        return acc;
    }, [])
}

function findPowerConsumption(input) {
    const out = findBits(input);
    const gammaRate = out.map((a) => {
        const noOfOnes = a.filter((num) => num === 1 ).length;
        if(input.length / 2 == noOfOnes) {
            return 1
        }
        return input.length / 2 > noOfOnes ? 0 : 1;
    }).join('');
    const epsilonRate = out.map((a) => {
        const noOfOnes = a.filter((num) => num === 1 ).length
        if(input.length / 2 == noOfOnes) {
            return 0
        }
        return input.length / 2 > noOfOnes ? 1 : 0;
    }).join('');
    return { 
        gammaRate: gammaRate, 
        epsilonRate: epsilonRate
    };
}

function findOxygenRating(input, k = 0) {
    let start = input
    if(start.length > 1) {
        const {gammaRate, epsilonRate} = findPowerConsumption(start);
        const oxyGenRating = []
        start.forEach((b, j) => {
        // console.log(a)
            if(b.split('')[k] == gammaRate.split('')[k]) {
                oxyGenRating.push(b)
            }
        })
        start = oxyGenRating;
        return findOxygenRating(start, k+1);
    } else {
        return parseInt(start[0], 2);
    }
}

function findCO2Rating(input, k = 0) {
    let start = input
    if(start.length > 1) {
        const {epsilonRate} = findPowerConsumption(start);
        const co2Rating = []
        start.forEach((b, j) => {
        // console.log(a)
            if(b.split('')[k] == epsilonRate.split('')[k]) {
                co2Rating.push(b)
            }
        })
        start = co2Rating;
        return findCO2Rating(start, k+1);
    } else {
        return parseInt(start[0], 2);
    }
}
fs.readFile('input.txt', 'utf-8', (err, s) => {
    const data = s.split('\n');
    const {gammaRate, epsilonRate}= findPowerConsumption(data);
    console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2))
    console.log(findOxygenRating(data) * findCO2Rating(data));
})