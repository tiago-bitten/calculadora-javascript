const display = document.querySelector('.display')
const buttons = document.querySelector('.nums-button')

document.addEventListener('click', (e) => {
    const target = e.target

    if (target.classList.contains('button-num')) {
        const num = target.innerText
        
        addDisplay(num)
    }

    if (target.classList.contains('button-cls')) {
        clsDisplay()
    }
})

function addDisplay(num) {
    display.value += num
}

function clsDisplay() {
    display.value = display.value.slice(0, -1)
}