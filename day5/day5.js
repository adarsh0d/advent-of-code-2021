const fs = require('fs-extra');

function noOfStraightLines(input) {
    const horizontalOrVerticalLiens = input.filter((line) => {
        const [xx, yy] = line.split('->')
        const [a, b] = xx.split(',').map(Number);
        const [q, r] = yy.split(',').map(Number);

        if (a == q || b == r) {
            return line;
        }
    });
    const table = [];

    horizontalOrVerticalLiens.forEach((line) => {
        const [xx, yy] = line.split('->')
        const [a, b] = xx.split(',').map(Number);
        const [q, r] = yy.split(',').map(Number);
        if (a == q && b == r) {
            table.push(a, b)
        } else {
            table.push(xx.trim())
            table.push(yy.trim());
            if (a == q) {
                if(b < r) {
                    for (let i = b+1; i < r; i++) {
                        table.push(`${q},${i}`);
                    }
                } else {
                    for (let i = b-1; i > r; i--) {
                        table.push(`${q},${i}`);
                    }
                }
            } else if (b == r) {
                if(a < q) {
                    for (let i = a+1; i < q; i++) {
                        table.push(`${i},${r}`);
                    }
                } else {
                    for (let i = a-1; i > q; i--) {
                        table.push(`${i},${r}`);
                    }
                }
            }
        }
    })
    const answers = [];
    new Set(table).forEach((elem) => {
        const findLength = table.filter((find) => elem === find).length
        if(findLength > 1) {
            answers.push(findLength);
        }
    })
    console.log(answers.length)
}


function noOfAllLines(input) {
    const table = [];

    input.forEach((line) => {
        const [xx, yy] = line.split('->')
        const [a, b] = xx.split(',').map(Number); // starting coordinates
        const [q, r] = yy.split(',').map(Number); //ending coordinates
        if (a == q && b == r) {
            table.push(a, b)
        } else {
            table.push(xx.trim())
            table.push(yy.trim());
            if (a == q && b !== r) {
                if(b < r) {
                    for (let i = b+1; i < r; i++) {
                        table.push(`${q},${i}`);
                    }
                } else {
                    for (let i = b-1; i > r; i--) {
                        table.push(`${q},${i}`);
                    }
                }
            } else if (b == r && a !== q) {
                if(a < q) {
                    for (let i = a+1; i < q; i++) {
                        table.push(`${i},${r}`);
                    }
                } else {
                    for (let i = a-1; i > q; i--) {
                        table.push(`${i},${r}`);
                    }
                }
            } else if( a == r && b == q) {
                if( a < q) {
                    for(let i = a + 1, j = b -1 ; i< q; i++, j--) {
                        table.push(`${i},${j}`)
                    }
                } else {
                    for (let i = a-1, j = b + 1; i > q; i--, j++) {
                        table.push(`${i},${j}`);
                    }
                }
            } else if( a !== q && b !== r && b !== q && a !== r && (a !== b || q !==r)) {
                if( a < q && b < r) {
                    for(let i = a + 1, j = b+1 ; i< q; i++, j++) {
                        table.push(`${i},${j}`)
                    }
                } else if( a > q && b > r) {
                    for (let i = a-1, j = b - 1; i > q; i--, j--) {
                        table.push(`${i},${j}`);
                    }
                } else if( a < q && b > r) {
                    for(let i = a + 1, j = b -1 ; i< q; i++, j--) {
                        table.push(`${i},${j}`)
                    }
                } else if( a > q && b < r) {
                    for (let i = a-1, j = b + 1; i > q; i--, j++) {
                        table.push(`${i},${j}`);
                    }
                }
            } else if( a == b && q == r) {
                if( a < q) {
                    for(let i = a + 1 ; i< q; i++) {
                        table.push(`${i},${i}`)
                    }
                } else {
                    for (let i = a-1; i > q; i--) {
                        table.push(`${i},${i}`);
                    }
                }
            }
        }
    })
    const answers = [];
    new Set(table).forEach((elem) => {
        const findLength = table.filter((find) => elem === find).length;
        if(findLength > 1) {
            answers.push(findLength);
        }
    })
    console.log(answers.length)
}
fs.readFile('input.txt', 'utf-8', (err, s) => {
    const input = s.split('\n');
    console.log(noOfStraightLines(input));
    console.log(noOfAllLines(input));
})