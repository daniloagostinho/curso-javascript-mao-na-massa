class DialogRequiredField extends HTMLElement {
    constructor() {
        super();

        

        fetch('src/components/shared/dialog-required-field/DialogRequiredField.html')
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
    customElements.define('app-dialog-required-field', DialogRequiredField)
}