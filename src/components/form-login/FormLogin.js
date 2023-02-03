class FormLogin extends HTMLElement {
    constructor() {
        super();

        console.log('working -> ', this)

        fetch('src/components/form-login/FormLogin.html')
        .then(response => response.text())
        .then(text => this.innerHTML = text)
    }

    connectedCallback () {
        console.log('iniciou o componente')
    }

    disconnectedCallback () {
        console.log('destruiu o componente')
    }
}

const handleLogin = async () => {
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;

    if(verifyFormLoginCompletedFields(email, password)) {
        // requisição HTTP
        alert('Login realizado com sucesso!')
    } else {
        openFormLoginDialofRequiredField();
    }
}

const verifyFormLoginCompletedFields = (email, password) => {
    if(email !== '' && password !== '') {
        return true;
    }

    return false;
}

const openFormLoginDialofRequiredField = () => {
    const dialog = document.querySelector('.modal-required-field');
    dialog.click();
}

if('customElements' in window) {
    customElements.define('app-form-login', FormLogin)
}