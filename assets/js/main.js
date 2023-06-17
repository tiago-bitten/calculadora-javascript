const display = document.querySelector('.display')
const buttons = document.querySelector('.nums-button')

document.addEventListener('click', (e) => {
    const target = e.target

    if (target.classList.contains('button-num')) {
        const num = target.innerText       
        addDisplay(num, 'num')
    }

    if (target.classList.contains('button-operation')) {
        if (display.value !== '') {
            const check = checkMoreThanOneOperation()

            addDisplay(target.innerText, 'operation')

        } else {
            alert('Digite um número primeiro!')
        }
    }

    if (target.classList.contains('button-equal')) {
        const result = calc()
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

function calc() {
    const result = eval(display.value)
    return result
}