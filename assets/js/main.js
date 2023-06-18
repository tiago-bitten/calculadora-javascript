const display = document.querySelector('.display')

let opTurn = false
let clsAll = false

let expressionArr = []
let resExpression = null

document.addEventListener('click', (e) => {
    const target = e.target
    console.log(target.textContent)

    if (target.classList.contains('button-num')) {
        if (clsAll) {
            clsAllDisplay()
            clsAll = false
        }

        const num = target.innerText
        addDisplay(num, 'num')

        expressionArr.push(num)

        opTurn = true
    }

    if (target.classList.contains('button-operator')) {
        if (opTurn) {
            const operator = target.textContent
            if (operator === '×') {
                expressionArr.push('*')
            } else if (operator === '÷') {
                expressionArr.push('/')
            } else {
                expressionArr.push(operator)
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
                    history += `${historys[i].exp}\n`
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
    const expressionStr = expressionArr.join('')
    let result = ''

    try {
        result = eval(expressionStr)
        resExpression = `${expressionStr} = ${result}`
        setLocalStorageHistory(resExpression)

        result = Number(result)
        if (Number.isInteger(result)) return result
        else return result.toFixed(2)

    } catch (err) {
        console.log(err)
    }
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
    const existingHistory = localStorage.getItem('History');

    if (!(existingHistory)) {
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
                <strong>${title}:<br></strong> <span style="margin-bottom: 15;">${msg.replace(/\n/g, '<br>')}</span>
            </div>
        </div>`;
    container.insertAdjacentHTML('beforeend', alertHTML);
}