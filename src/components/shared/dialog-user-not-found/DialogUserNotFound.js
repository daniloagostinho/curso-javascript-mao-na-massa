class DialogUserNotFound extends HTMLElement {
    constructor() {
        super();

        

        fetch('src/components/shared/dialog-user-not-found/DialogUserNotFound.html')
        .then(response => response.text())
        .then(text => this.innerHTML = text)


    }

    connectedCallback () {
        
    }

    disconnectedCallback() {
        
    }
}


if('customElements' in window) {
    customElements.define('app-dialog-user-not-found', DialogUserNotFound)
}