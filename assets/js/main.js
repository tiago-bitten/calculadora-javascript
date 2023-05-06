function Calculadora() {
    this.display = document.querySelector('.display');
   
    this.inicia = () => this.capturaCliques();

    this.capturaCliques = () => {
        document.addEventListener('click', event => {
            const el = event.target;

            if (el.classList.contains('btn-num')) this.addNumDisplay(el);

            if (el.classList.contains('btn-eq')) this.showResult();

            if (el.classList.contains('btn-clear')) this.clearDisplay();

            if (el.classList.contains('btn-del')) this.deleteDisplay();
        });
    }

    this.addNumDisplay = (el) => this.display.value += el.innerText;

    this.showResult = () => {
        let res = this.display.value;

        try {
            res = eval(res);
        
            if (!res) {
                alert('Conta invalida');
                return;
            }
            
            this.display.value = res.toFixed(2);

        } catch(e) {
            alert('Conta invalida')
            return;
        }
    }

    this.clearDisplay = () => this.display.value = '';

    this.deleteDisplay = () => this.display.value = this.display.value.slice(0, -1);
}

const calculadora = new Calculadora();
calculadora.inicia();