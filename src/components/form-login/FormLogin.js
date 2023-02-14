class FormLogin extends HTMLElement {
    constructor() {
        super();

        

        fetch('src/components/form-login/FormLogin.html')
        .then(response => response.text())
        .then(text => this.innerHTML = text)
    }

    connectedCallback () {
        ('iniciou o componente')
    }

    disconnectedCallback () {
        ('destruiu o componente')
    }
}

const handleLogin = async () => {
    let callCreatePayloadLogin = createPayloadLogin();

    const {email} = callCreatePayloadLogin;
    const {password} = callCreatePayloadLogin;

    if(!verifyFormLoginFieldFill(email, password)) {
        openFormLoginDialogRequiredField();
        return;
    }

    userAuthentication();

}

const userAuthentication = async () => {
    let callCreatePayloadLogin = createPayloadLogin();
    const {email} = callCreatePayloadLogin;

    await window.login('http://localhost:3000/auth/login', callCreatePayloadLogin)
    .then(handleAuthenticationError)
    .then(response => response.json())
    .then(response => {
         localStorage.setItem('token', response.token);
         localStorage.setItem('user', email)
         onNavigate('/dashboard')
    })
    .catch(errorTypeVerification)
}

const createPayloadLogin = () => {
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;

    return {
        email,
        password
    }
}

const handleAuthenticationError = (response) => {
    if(!response.ok) {
        throw Error(response.statusText)
    }

    return response;
}

const errorTypeVerification = (error) => {
    if(error == 'Error: Not Found') {
        openFormLoginDialogUserNotFound();
    }
}


const openFormLoginDialogUserNotFound = () => {
    const dialog = document.querySelector('.modal-user-not-found');
    dialog.click();
}

const verifyFormLoginFieldFill = (email, password) => email !== '' && password !== '';

const openFormLoginDialogRequiredField = () => {
    const dialog = document.querySelector('.modal-required-field');
    dialog.click();
}

if('customElements' in window) {
    customElements.define('app-form-login', FormLogin)
}