const fs = require('fs-extra');

function part1(input) {
    input = input.split('\n')
    let min = []
    input.forEach((el, i) => {
        el.split('').forEach((num, j) => {
            if (i !== 0 && i !== input.length - 1) {
                if (j !== el.length - 1 && j !== 0) {
                    if (parseInt(num) < parseInt(el[j + 1]) && parseInt(num) < parseInt(el[j - 1])) {
                        const prevRow = input[i - 1].split('')
                        const nextRow = input[i + 1].split('')
                        if (parseInt(num) < prevRow[j] && parseInt(num) < nextRow[j]) {
                            min.push(num)
                        }
                    }
                } else if (j == 0) {
                    if (parseInt(num) < parseInt(el[j + 1])) {
                        const prevRow = input[i - 1].split('')
                        const nextRow = input[i + 1].split('')
                        if (parseInt(num) < prevRow[j] && parseInt(num) < nextRow[j]) {
                            min.push(num)
                        }
                    }
                } else if (j == el.length - 1) {
                    if (parseInt(num) < parseInt(el[j - 1])) {
                        const prevRow = input[i - 1].split('')
                        const nextRow = input[i + 1].split('')
                        if (parseInt(num) < prevRow[j] && parseInt(num) < nextRow[j]) {
                            min.push(num)
                        }
                    }
                }
            } else if (i == 0) {
                if (j !== el.length - 1 && j !== 0) {
                    if (parseInt(num) < parseInt(el[j + 1]) && parseInt(num) < parseInt(el[j - 1])) {
                        const nextRow = input[i + 1].split('')
                        if (parseInt(num) < nextRow[j]) {
                            min.push(num)
                        }
                    }
                } else if (j == 0) {
                    if (parseInt(num) < parseInt(el[j + 1])) {
                        const nextRow = input[i + 1].split('')
                        if (parseInt(num) < nextRow[j]) {
                            min.push(num)
                        }
                    }
                } else if (j == el.length - 1) {
                    if (parseInt(num) < parseInt(el[j - 1])) {
                        const nextRow = input[i + 1].split('')
                        if (parseInt(num) < nextRow[j]) {
                            min.push(num)
                        }
                    }
                }
            } else if (i == input.length - 1) {
                if (j !== el.length - 1 && j !== 0) {
                    if (parseInt(num) < parseInt(el[j + 1]) && parseInt(num) < parseInt(el[j - 1])) {
                        const prevRow = input[i - 1].split('')
                        if (parseInt(num) < prevRow[j]) {
                            min.push(num)
                        }
                    }
                } else if (j == 0) {
                    if (parseInt(num) < parseInt(el[j + 1])) {
                        const prevRow = input[i - 1].split('')
                        if (parseInt(num) < prevRow[j]) {
                            min.push(num)
                        }
                    }
                } else if (j == el.length - 1) {
                    if (parseInt(num) < parseInt(el[j - 1])) {
                        const prevRow = input[i - 1].split('')
                        if (parseInt(num) < prevRow[j]) {
                            min.push(num)
                        }
                    }
                }
            }
        })
    })
    console.log(min)
    return min.reduce((acc, num) => {
        return acc + parseInt(num) + 1
    }, 0)
}
function part2(input) {

    const inputArray = input.split('\n').map(a => a.split('').map(a => parseInt(a)));


    const localMin = (topArray, topIndex, rowIndex) => {
        let value = topArray[topIndex][rowIndex];
        let rowArray = topArray[topIndex];
        return (topIndex == 0 || value < topArray[topIndex - 1][rowIndex]) &&
            (topIndex == topArray.length - 1 || value < topArray[topIndex + 1][rowIndex]) &&
            (rowIndex == 0 || rowArray[rowIndex] < rowArray[rowIndex - 1]) &&
            (rowIndex == rowArray.length - 1 || rowArray[rowIndex] < rowArray[rowIndex + 1]);
    }


    const localMinAndNineMap = (topArray) => {
        let mapArray = [...topArray.map(a => a.filter(b => b == b))];
        let incrementer = 10;
        for (let i = 0; i < topArray.length; i++) {
            for (let j = 0; j < topArray[i].length; j++) {
                if (localMin(topArray, i, j)) {
                    mapArray[i][j] = incrementer;
                    incrementer++
                } else if (topArray[i][j] != 9) {
                    mapArray[i][j] = 0;
                }
            }
        }
        return mapArray;
    }

    const basinFill = (mapToFill) => {
        let filledMap = [...mapToFill.map(a => a.filter(b => b == b))];
        let indicator = true;
        while (indicator == true) {
            indicator = false;
            for (let i = 0; i < filledMap.length; i++) {
                for (let j = 0; j < filledMap[i].length; j++) {
                    if (filledMap[i][j] > 9) {
                        let current = filledMap[i][j];
                        if (i - 1 >= 0 && filledMap[i - 1][j] == 0) {
                            filledMap[i - 1][j] = current;
                            indicator = true;
                        }
                        if (i + 1 < filledMap.length && filledMap[i + 1][j] == 0) {
                            filledMap[i + 1][j] = current;
                            indicator = true;
                        }
                        if (j + 1 < filledMap[i].length && filledMap[i][j + 1] == 0) {
                            filledMap[i][j + 1] = current;
                            indicator = true;
                        }
                        if (j - 1 >= 0 && filledMap[i][j - 1] == 0) {
                            filledMap[i][j - 1] = current;
                            indicator = true;
                        }
                    }
                }
            }
        }
        return filledMap;
    }

    const createBasinCellArray = (startArray) => {
        let topResult = [];
        for (let i = 10; i < 1000; i++) {
            let interimArray = [];
            for (let array of startArray) {
                for (let item of array) {
                    if (item == i) {
                        interimArray.push(item);
                    }
                }
            }
            topResult.push(interimArray);
        }
        return topResult.sort((a, b) => b.length - a.length)
    }

    const solutionArray = (array) => {
        return createBasinCellArray(basinFill(localMinAndNineMap(array))).map(a => a.length);
    }

    const solution = (array) => {
        let arr = solutionArray(array);
        return arr[0] * arr[1] * arr[2];
    }

    console.log(solution(inputArray));
}
fs.readFile('input.txt', 'utf-8', (err, s) => {
    const input = s;
    //console.log(part1(input));
    //console.log(part1(input));
    console.log(part2(input));
})