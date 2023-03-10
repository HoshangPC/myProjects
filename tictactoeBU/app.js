let userWin = false
let botWin = false
let lastValue = 0
let tillDraw = 0
let xarray = []
let oarray = []
let winLine = []
let checkArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]

const startBtn = document.getElementById('startBtn')
startBtn.addEventListener('click', function () {
    resetBtn()
})

let h2 = document.querySelector('h2')
h2.innerHTML = "Let's play 😃"

function clickBtn(n) {
    let userBtn = document.getElementById(`btn${n}`)
    userBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    userBtn.style.background='#5D3891'
    userBtn.disabled = true
    xarray.push(n)
    userWin = checkXOArray(checkArray, xarray)
    tillDraw += 1
    startBtn.disabled = true

    if (userWin) {
        h2.innerHTML = 'You Won 🙂'
        makeBtnGreen(checkArray, xarray)
        disableAllBtn()
        startBtn.disabled = false

    } else if (tillDraw != 9) {
        setTimeout(function () {
            pushNumber(oarray, xarray)
            lastValue = oarray[oarray.length - 1]
            let botBtn = document.getElementById(`btn${lastValue}`)
            botBtn.innerHTML = '<i class="fa-solid fa-o"></i>'
            botBtn.style.background='#820000'
            botBtn.disabled = true
            startBtn.disabled = false

            botWin = checkXOArray(checkArray, oarray)
            if (botWin) {
                h2.innerHTML = 'Bot Won 😂'
                makeBtnGreen(checkArray, oarray)
                disableAllBtn()
                startBtn.disabled = false

            }
            tillDraw += 1
        }, 500);
    } else if (!userWin && !botWin && tillDraw == 9) {
        h2.innerHTML = 'Draw 😒😒'
        startBtn.disabled = false

    }
}


//disable all btns
function disableAllBtn() {
    for (let i = 1; i < 10; i++) {
        let tempDb = document.getElementById(`btn${i}`)
        tempDb.disabled = true
    }
}

//re-enable all btns
function enableAllBtn() {
    for (let i = 1; i < 10; i++) {
        let tempDb = document.getElementById(`btn${i}`)
        tempDb.disabled = false
    }
}

function resetBtn() {
    for (let i = 1; i < 10; i++) {
        let tempDb = document.getElementById(`btn${i}`)
        tempDb.innerHTML = ''
        tempDb.style.background = '#F99417'
    }
    enableAllBtn()
    xarray = []
    oarray = []
    h2.innerHTML = "Let's play 😃"
    tillDraw = 0
    lastValue = 0
    userWin = false
    botWin = false
}

function checkXOArray(checkArray, xarray) {
    for (let i = 0; i < checkArray.length; i++) {
        let row = checkArray[i];
        let count = 0;
        for (let j = 0; j < xarray.length; j++) {
            if (row.includes(xarray[j])) {
                count++;
            }
        }
        if (count >= 3) {
            return true
        }
    }
}

function pushNumber(arr1, arr2) {
    var num = Math.floor(Math.random() * 9) + 1;
    while (arr2.includes(num) || arr1.includes(num)) {
        num = Math.floor(Math.random() * 9) + 1;
    }
    arr1.push(num);
    return arr1;
}


//detect which row of checkArray matchs x or o array
function findMatchingElements(checkArray, xarray) {
    for (let i = 0; i < checkArray.length; i++) {
        let matchCount = 0;
        for (let j = 0; j < checkArray[i].length; j++) {
            if (xarray.includes(checkArray[i][j])) {
                matchCount++;
            }
        }
        if (matchCount >= 3) {
            return checkArray[i];
        }
    }
    return [];
}

//make btn green
function makeBtnGreen(checkArray, xarray) {
    for (let i = 0; i < 3; i++) {
        let num = findMatchingElements(checkArray, xarray)[i]
        let tempbtn = document.getElementById(`btn${num}`)
        tempbtn.style.background = 'green'
    }
}