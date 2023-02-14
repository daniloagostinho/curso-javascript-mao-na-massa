class Revenues extends HTMLElement {
    constructor() {
        super();

        

        fetch('src/components/dashboard/revenues/Revenues.html')
        .then(response => response.text())
        .then(text => this.innerHTML = text)


    }

    connectedCallback () {
        
    }

    disconnectedCallback() {
        
    }
}

if('customElements' in window) {
    customElements.define('app-revenues', Revenues)
}