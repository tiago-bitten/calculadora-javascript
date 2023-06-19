const display = document.querySelector('.display')

let opTurn = false
let clsAll = false
let comma = true

let expressionArr = []

document.addEventListener('click', (e) => {
    const target = e.target
    const val = target.textContent

    if (target.classList.contains('button-num')) {
        if (clsAll) {
            clsAllDisplay()
            clsAll = false
        }

        if (display.textContent === '0') {
            display.textContent = ''
        }

        expressionArr.push(val)

        if (!(checkZero(expressionArr))) {
            addDisplay(val, 'num')
            opTurn = true
        }
    }

    if (target.classList.contains('button-plus-less')) {
        const lastIndex = expressionArr.length - 1
        const valueStr = expressionArr[lastIndex]
        const value = Number(valueStr)

        let newValue = 0

        if (value > 0) {
            newValue = value - 2 * (value)
        } else if (value < 0) {
            newValue = value - 2 * (value)
        }

        if (newValue !== 0) {
            newValue = String(newValue)
            expressionArr.pop()
            expressionArr.push(newValue)
        }

        display.textContent = ''
        addDisplay(newValue, 'num')
    }

    if (target.classList.contains('button-comma')) {
        if (clsAll) {
            clsAllDisplay()
            clsAll = false
        }

        if (comma) {
            expressionArr.push('.')
            comma = false
            if (expressionArr[0] === '.') {
                expressionArr.splice(0, 1, '0.')
                addDisplay(val, 'comma')
            } else {
                addDisplay(val, 'comma')
            }
        }
    }

    if (target.classList.contains('button-operator')) {
        if (opTurn) {
            const operator = target.textContent
            if (operator === '×') {
                expressionArr.push(' * ')
            } else if (operator === '÷') {
                expressionArr.push(' / ')
            } else {
                expressionArr.push(operator)
                opTurn = false
            }
            clsAll = true
            comma = true
        }
    }

    if (target.classList.contains('button-equal')) {
        const result = calculate()
        if (result && expressionArr.length !== 0) {
            addDisplay(result, 'result')

            expressionArr = []
            clsAll = true
            comma = true
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
        expressionArr.pop()
    }

    if (target.classList.contains('button-cls-all')) {
        clsAllDisplay()
        expressionArr = []
    }

    console.log(expressionArr)
})

function addDisplay(val, type) {
    if (type === 'result') {
        display.textContent = val
    } else {
        display.textContent += val
    }
}

function clsDisplay() {
    if (display.textContent !== '0') {
        display.textContent = display.textContent.slice(0, -1)
    }
}

function clsAllDisplay() {
    display.textContent = '0'
}

function calculate() {
    const convertExpress = convertExpression(expressionArr)
    const expressionStr = expressionArr.join('')
    let result = ''
    let resExpression = ''

    const lastIndex = expressionArr.length - 1
    if (isNaN(expressionArr[lastIndex])) return false

    try {
        console.log(expressionStr)
        result = eval(expressionStr)

        result = Number(result)
        if (!(Number.isInteger(result))) {
            result = result.toFixed(2)
        }

        result = String(result)
        result.replace('.', ',')

        resExpression = `${convertExpress} = ${result}`
        setLocalStorageHistory(resExpression)

        return result

    } catch (err) {
        console.log(err)
    } finally {
        clsAllDisplay()
    }
}

function checkZero(arr) {
    if (arr[0] === '0') {
        arr.splice(0, 1)
        display.textContent = '0'
        return true
    }

    return false
}

function convertExpression(expression) {
    const operatorsRegex = /[-+*/.]/g;

    const convertExpression = expression.map((item) => {
        return item.replace(operatorsRegex, (match) => {
            switch (match) {
                case '/':
                    return '÷';
                case '*':
                    return '×';
                case '+':
                    return ' + ';
                case '-':
                    return ' - ';
                case '.':
                    return ',';
                default:
                    return match;
            }
        });
    });

    return convertExpression.join('');
}

function avaliableLocalStorageHistory() {
    if (localStorage.getItem('History')) {
        return true
    }
    return false
}

function removeLocalStorage(item) {
    localStorage.removeItem(item)
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
                <span class="closebtn" onclick="closeAlertMessage(this);">&times;</span>
                <strong>${title}:<br></strong>${msg}
                <button class="button-clear-history" onclick="closeAlertMessage(this, 'History')">Limpar Histórico</button>
            </div>
        </div>`;
    container.insertAdjacentHTML('beforeend', alertHTML);
}

function closeAlertMessage(parent, item) {
    if (item) {
        removeLocalStorage(item)
    }
    parent.parentElement.parentElement.remove()
}