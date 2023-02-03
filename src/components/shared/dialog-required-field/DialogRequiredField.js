class DialogRequiredField extends HTMLElement {
    constructor() {
        super();

        console.log('working -> ', this)

        fetch('src/components/shared/dialog-required-field/DialogRequiredField.html')
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
    customElements.define('app-dialog-required-field', DialogRequiredField)
}