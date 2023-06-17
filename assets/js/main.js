const display = document.querySelector('.display')
const buttons = document.querySelector('.nums-button')

document.addEventListener('click', (e) => {
    const target = e.target

    if (target.classList.contains('button-num')) {
        const num = target.innerText       
        addDisplay(num)
    }

    if (target.classList.contains('button-operation')) {
        if (display.value !== '') {
            addDisplay(target.innerText)
        } else {
            alert('Digite um número primeiro!')
        }
    }

    if (target.classList.contains('button-cls')) {
        clsDisplay()
    }

    if (target.classList.contains('button-cls-all')) {
        clsAllDisplay()
    }
})

function addDisplay(num) {
    display.value += num
}

function clsDisplay() {
    display.value = display.value.slice(0, -1)
}

function clsAllDisplay() {
    display.value = ''
}