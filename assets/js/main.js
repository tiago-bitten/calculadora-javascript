const display = document.querySelector('.display')
const buttons = document.querySelector('.buttons')

buttons.addEventListener('click', (e) => {
    const target = e.target

    if (target.classList.contains('button-num')) {
        const num = target.innerText
        
        addDisplay(num)
    }
})

function addDisplay(num) {
    display.value + = num
}