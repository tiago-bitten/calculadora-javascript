const display = document.querySelector('.display')

let opTurn = false
let clsAll = false
let comma = true 

let expressionArr = []

document.addEventListener('click', (e) => {
    const target = e.target
    if (target.classList.contains('button-num')) {
        if (clsAll) {
            clsAllDisplay()
            clsAll = false
        }

        const num = target.innerText
        expressionArr.push(num)

        checkZero(expressionArr, num)
        // checkComma(expressionArr, num)


        opTurn = true
    }

    if (target.classList.contains('button-operator')) {
        if (opTurn) {
            const operator = target.textContent
            if (operator === '×') {
                expressionArr.push(' * ')
            } else if (operator === '÷') {
                expressionArr.push(' / ')
            } else {
                expressionArr.push(operator.concat(''))
            }
            clsAll = true
            opTurn = false
        }
    }

    if (target.classList.contains('button-equal')) {
        if (!(expressionArr.length === 0)) {
            const result = calculate()
            addDisplay(result, 'result')

            expressionArr = []
            clsAll = true
        }
    }

    if (target.classList.contains('button-history')) {
        if (avaliableLocalStorageHistory()) {
            const historys = getLocalStorageHistory()
            let history = ''

            if (historys.length !== 0) {
                for (let i = 0; i < historys.length; i++) {
                    history += `${historys[i].exp}<br>`
                }
            }

            createAlertMessage('Histórico', history)
        }
    }

    if (target.classList.contains('button-cls')) {
        clsDisplay()
    }

    if (target.classList.contains('button-cls-all')) {
        clsAllDisplay()
    }
})

function addDisplay(val, type) {
    if (type === 'result') {
        display.textContent = val
    } else {
        display.textContent += val
    }
}

function clsDisplay() {
    display.textContent = display.textContent.slice(0, -1)
}

function clsAllDisplay() {
    display.textContent = ''
}

function calculate() {
    const convertExpress = convertExpression(expressionArr)
    const expressionStr = expressionArr.join('')
    let result = ''
    let resExpression = ''

    try {
        result = eval(expressionStr)

        result = Number(result)
        if (!(Number.isInteger(result))) {
            result = result.toFixed(2)
        }

        resExpression = `${convertExpress} = ${result}`
        setLocalStorageHistory(resExpression)

        return result

    } catch (err) {
        console.log(err)
    }
}

function checkZero(arr, val) {
    if (arr[0] === '0') {
        arr.splice(0, 1)
    } else {
        addDisplay(val, 'num')
    }
}
/*
function checkComma(arr, val) {
    if (comma) {
        comma = false
        if (arr[0] === val) {
            arr.splice(0, 1, '0.')
            return true
        } else {
            addDisplay(val, 'num')
        }
    }
    return false
}
*/
function convertExpression(expression) {
    const plusLessRegex = /\+|\-/g
    const divMultiRegex = /\/|\*/g

    const convertExpress = expression.map((item) => {
        return item.replace(divMultiRegex, (match) => {
            if (match === '/') {
                return '÷'
            } else if (match === '*') {
                return '×'
            }
        })
    })

    const finalExpress = convertExpress.map((item) => {
        return item.replace(plusLessRegex, (match) => {
            if (match === '+') {
                return ' + '
            } else if (match === '-') {
                return ' - '
            }
        })
    })

    const finalExpressStr = finalExpress.join('')

    return finalExpressStr
}

function avaliableLocalStorageHistory() {
    if (localStorage.getItem('History')) {
        return true
    }
    return false
}

function getLocalStorageHistory() {
    const historyStorage = localStorage.getItem('History')
    const historyArr = JSON.parse(historyStorage)

    return historyArr
}

function setLocalStorageHistory(expression) {
    if (!(avaliableLocalStorageHistory())) {
        const historyArr = []
        const historyJson = JSON.stringify(historyArr)
        localStorage.setItem('History', historyJson)
    }

    const historyArr = getLocalStorageHistory()

    const historyObj = { exp: expression }
    historyArr.push(historyObj)

    const historyJson = JSON.stringify(historyArr)
    localStorage.setItem('History', historyJson)
}

function createAlertMessage(title, msg) {
    const container = document.querySelector('.container');
    const alertHTML = `
        <div class="overlay">
            <div class="alert">
                <span class="closebtn" onclick="this.parentElement.parentElement.remove();">&times;</span>
                <strong>${title}:<br></strong> <span style="margin-bottom: 15;">${msg}</span>
            </div>
        </div>`;
    container.insertAdjacentHTML('beforeend', alertHTML);
}