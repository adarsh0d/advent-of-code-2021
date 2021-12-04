const fs = require('fs-extra');
let seq = null
let boards = null;

function isBoardFilled(board) {
    const ifBoardFilled = board.some((row) => {
        const ifRowFilled = row.every((val) => {
            return val === '_'
        })
        return ifRowFilled
    })
    if (ifBoardFilled) {
        return ifBoardFilled;
    } else {
        const vBoard = board[0].map((x, i) => board.map(x => x[i]))
        const ifvBoardFilled = vBoard.some((row) => {
            const ifRowFilled = row.every((val) => {
                return val === '_'
            })
            return ifRowFilled
        })
        if (ifvBoardFilled) {
            return ifvBoardFilled;
        }
    }
}

function checkRows(boards) {
    const filledBoard = boards.find((board) => {
        return isBoardFilled(board);
    })
    if (filledBoard) {
        return filledBoard
    } else {
        return false;
    }
}

function playBingo() {
    let hBoards = boards.map((board, i) => {
        const numberedrows = board.split('\n').map((row, j) => {
            return row.split(/\s/).filter((val) => val).map(Number);
        })
        return numberedrows;
    })
    let finalBoard = null
    let finalWord = null;
    const isBoardFilled = seq.some((word, i, arr) => {
        const filledBoard = checkRows(hBoards);
        if (!filledBoard) {
            const markedBoards = hBoards.map((board) => {
                const markedBoard = board.map((row) => {
                    const markedRow = row.map((num) => {
                        if (num === word) {
                            return '_'
                        } else {
                            return num
                        }
                    })
                    return markedRow;
                })
                return markedBoard;
            })
            hBoards = markedBoards;
        } else {
            finalBoard = filledBoard;
            finalWord = arr[i - 1];
            return filledBoard
        }
    });
    let sum = 0
    finalBoard.forEach(row => {
        row.forEach((num) => {
            if (!isNaN(parseInt(num))) {
                sum += num;
            }
        })
    });
    return sum * finalWord
}


function findLastBingoWinner() {
    let hBoards = boards.map((board, i) => {
        const numberedrows = board.split('\n').map((row, j) => {
            return row.split(/\s/).filter((val) => val).map(Number);
        })
        return numberedrows;
    })
    let finalWords = [];
    let winners = []
    let winnerBoards = []
    seq.forEach((word, i, arr) => {
        const markedBoards = hBoards.map((board, j) => {
            const filledBoard = isBoardFilled(board);
            if(filledBoard) {
                if(!winners.includes(j)) {
                    winners.push(j)
                    winnerBoards.push(board);
                    finalWords.push(arr[i-1])
                }
            }
            const markedBoard = board.map((row) => {
                const markedRow = row.map((num) => {
                    if (num === word) {
                        return '_'
                    } else {
                        return num
                    }
                })
                return markedRow;
            })
            return markedBoard;
        })
        hBoards = markedBoards;
    });
    let sum = 0
    winnerBoards[winnerBoards.length-1].forEach(row => {
        row.forEach((num) => {
            if (!isNaN(parseInt(num))) {
                sum += num;
            }
        })
    });
    return sum * finalWords[finalWords.length-1]
}

fs.readFile('board.txt', 'utf-8', (err, s) => {
    boards = s.split('\n\n');
    fs.readFile('input.txt', 'utf-8', (err, s) => {
        seq = s.split(',').map(Number);
        console.log(playBingo())
        console.log(findLastBingoWinner())
    })
})