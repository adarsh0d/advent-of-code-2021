const fs = require('fs-extra');

function findFinalHorizontalPosition(input) {
    const output = input.reduce((acc, i) => {
        const step = i.split(' ');
        if(step[0] === 'forward') {
            acc[0] = acc[0] + parseInt(step[1]);
        } else if(step[0] === 'up') {
            acc[1] = acc[1] - parseInt(step[1]);
        } else if(step[0] === 'down') {
            acc[1] = acc[1] + parseInt(step[1]);
        }
        return acc;
    }, [0, 0])
    return output[0] * output[1];
}
function findFinalHorizontalPositionWithAim(input) {
    const output = input.reduce((acc, i) => {
        const step = i.split(' ');
        if(step[0] === 'forward') {
            acc[1] = acc[1] + (acc[2] * parseInt(step[1]));
            acc[0] = acc[0] + parseInt(step[1]);
        } else if(step[0] === 'up') {
            acc[2] = acc[2] - parseInt(step[1]);
        } else if(step[0] === 'down') {
            acc[2] = acc[2] + parseInt(step[1]);
        }
        return acc;
    }, [0, 0, 0])
    return output[0] * output[1];
}
fs.readFile('input.txt', 'utf-8', (err, s) => {
    const data = s.split('\n');
    console.log(findFinalHorizontalPosition(data));
    console.log(findFinalHorizontalPositionWithAim(data))
})