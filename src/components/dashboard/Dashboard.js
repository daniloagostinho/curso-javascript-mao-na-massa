class Dashboard extends HTMLElement {
    constructor() {
        super();

        

        fetch('src/components/dashboard/Dashboard.html')
        .then(response => response.text())
        .then(text => this.innerHTML = text)


    }

    connectedCallback () {
        
    }

    disconnectedCallback() {
        
    }
}

if('customElements' in window) {
    customElements.define('app-dashboard', Dashboard)
}