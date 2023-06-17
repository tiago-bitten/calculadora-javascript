const display = document.querySelector('.display')
const buttons = document.querySelector('.nums-button')

let opTurn = false
let clsAfterRes = false

let expressionArr = []

document.addEventListener('click', (e) => {
    const target = e.target

    if (target.classList.contains('button-num')) {
        if (!(clsAfterRes)) {
            const num = target.innerText       
            addDisplay(num, 'num')

            expressionArr.push(num)
    
            opTurn = true
        }
    }

    if (target.classList.contains('button-operator')) {
        if (opTurn) {
            const operator = target.innerText
            if (operator === 'x') {
                expressionArr.push('*')
            } else {
                expressionArr.push(operator)
            }
            clsAllDisplay()
            opTurn = false
        }
    }

    if (target.classList.contains('button-equal')) {
        if (!(expressionArr.length === 0)) {
            const result = calculate()
            addDisplay(result, 'result')
    
            expressionArr = []
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
        display.value = val
    } else {
        display.value += val
    }
}

function clsDisplay() {
    display.value = display.value.slice(0, -1)
}

function clsAllDisplay() {
    display.value = ''
}

function calculate() {
    const expressionStr = expressionArr.join('')
    let result = ''

    try {
        result = eval(expressionStr)
        return result

    } catch (err) {
        alert('Erro na expressão!')
    }
}
