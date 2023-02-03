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

    const user = {
        email,
        password
    }

    if(verifyFormLoginCompletedFields(email, password)) {
       await window.login('http://localhost:3000/auth/login', user)
       .then(catchApiFormLoginError)
       .then(response => response.json())
       .then(response => {
            localStorage.setItem('token', response.token);
            onNavigate('/dashboard')
       })
       .catch(handleFormLoginErrrorTypes)
        
    } else {
        openFormLoginDialogRequiredField();

    }
}

const catchApiFormLoginError = (response) => {
    if(!response.ok) {
        throw Error(response.statusText)
    }

    return response;
}

const handleFormLoginErrrorTypes = (error) => {
    if(error == 'Error: Not Found') {
        openFormLoginDialogUserNotFound();
    }
}


const openFormLoginDialogUserNotFound = () => {
    const dialog = document.querySelector('.modal-user-not-found');
    dialog.click();
}

const verifyFormLoginCompletedFields = (email, password) => {
    if(email !== '' && password !== '') {
        return true;
    }

    return false;
}

const openFormLoginDialogRequiredField = () => {
    const dialog = document.querySelector('.modal-required-field');
    dialog.click();
}

if('customElements' in window) {
    customElements.define('app-form-login', FormLogin)
}