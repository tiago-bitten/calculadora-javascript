const display = document.querySelector('.display')
const buttons = document.querySelector('.nums-button')

let opTurn = false

document.addEventListener('click', (e) => {
    const target = e.target

    if (target.classList.contains('button-num')) {
        const num = target.innerText       
        addDisplay(num, 'num')

        opTurn = true
    }

    if (target.classList.contains('button-operator')) {
        if (opTurn) {
            const operator = target.innerText
            addDisplay(operator, 'operator')
            opTurn = false
        }
    }

    if (target.classList.contains('button-equal')) {
        const result = calculate()
        addDisplay(result, 'result')
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
    const result = eval(display.value)
    return result
}
