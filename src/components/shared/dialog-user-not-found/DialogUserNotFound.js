class DialogUserNotFound extends HTMLElement {
    constructor() {
        super();

        

        fetch('src/components/shared/dialog-user-not-found/DialogUserNotFound.html')
        .then(response => response.text())
        .then(text => this.innerHTML = text)


    }

    connectedCallback () {
        ('iniciou o componente')
    }

    disconnectedCallback() {
        ('destruiu o componente')
    }
}


if('customElements' in window) {
    customElements.define('app-dialog-user-not-found', DialogUserNotFound)
}