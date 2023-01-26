class Dashboard extends HTMLElement {
    constructor() {
        super();

        console.log('working -> ', this)

        fetch('src/components/dashboard/Dashboard.html')
        .then(response => response.text())
        .then(text => this.innerHTML = text)


    }

    connectedCallback () {
        console.log('iniciou o componente')
    }

    disconnectedCallback() {
        console.log('destruiu o componente')
    }
}

if('customElements' in window) {
    customElements.define('app-dashboard', Dashboard)
}