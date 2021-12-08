const fs = require('fs-extra');

function part1(input) {
    const digits = input.map((el) => {
        return el.split('|')[1]
    })
    const filterDigits = [];

    digits.forEach((el) => {
        const a = el.trim().split(' ');
        a.forEach((word) => {
            if ([2, 3, 4, 7].includes(word.length)) {
                filterDigits.push(word)
            }
        })
    })
    return filterDigits.length;
}

function part2(input) {

    const finalOutput = []
    input.map((seq) => {
        let lightPositions = {}
        let first = seq.split('|')[0].trim().split(' ').sort((a,b) => a.length > b.length ? 1: -1);
        let remaining = []
        first.forEach(el => {
            const word = el.split('').sort();
            if(word.length == 2) {
                lightPositions[1] = word;
            } else if(word.length == 3) {
                lightPositions[7] = word
            } else if(word.length == 4) {
                lightPositions[4] = word
            } else if(word.length == 5) {
                const ifLetteris3 = lightPositions[7].every((el) => {
                    return word.join('').indexOf(el) > -1;
                })
                if(ifLetteris3) {
                    lightPositions[3] = word;
                } else {
                    remaining.push(word.join(''));
                }
            } else if(word.length == 7) {
                lightPositions[8] = word
            } else if(word.length == 6) {
                const ifLetterIs9 = lightPositions[4].every((el) => {
                    return word.join('').indexOf(el) > -1;
                })
                const isLetterIs0 = !ifLetterIs9 && lightPositions[7].every((el) => {
                    return word.join('').indexOf(el) > -1;
                })
                if(ifLetterIs9) {
                    lightPositions[9] = word;
                } else if(isLetterIs0) {
                    lightPositions[0] = word;
                } else {
                    lightPositions[6] = word
                }
             }
        })

        remaining.map((el) => {
            const ifLetteris5 = el.split('').every((word) => {
                return lightPositions[6].indexOf(word) > -1
            })
            if(ifLetteris5) {
                lightPositions[5] = el.split('')
            } else {
                lightPositions[2] = el.split('')
            }
        })

        let out = ''
        seq.split('|')[1].trim().split(' ').forEach((word) => {
            Object.keys(lightPositions).forEach(el => {
                if(word.split('').sort().join('') === lightPositions[el].join('')) {
                    out += el
                }
            })
        })
        finalOutput.push(out)
       // return el.split('|')[1]
    })

    return finalOutput.reduce((acc,a) => {
        return acc + parseInt(a)
    }, 0)
   // console.log(finalOutput);
}

fs.readFile('input.txt', 'utf-8', (err, s) => {
    const input = s.split('\n');
    //console.log(part1(input));
    console.log(part2(input));
})