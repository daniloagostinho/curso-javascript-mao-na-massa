class FormRegister extends HTMLElement {
    constructor() {
        super();

        console.log('working -> ', this)

        fetch('src/components/form-register/FormRegister.html')
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

userRegistrationData = {}


const handleFormRegister = async () => {
    let nameInputValue = document.querySelector('.nameInputValue').value;
    let emailInputValue = document.querySelector('.emailInputValue').value;
    let ageInputValue = document.querySelector('.ageInputValue').value;

    setUserRegistrationData(nameInputValue, emailInputValue, ageInputValue)

    if(!verifyFormRegisterFieldFill(nameInputValue, emailInputValue, ageInputValue)) {
        openDialogRequireField();
        return;
    }
    

    continueRegistrationModal();
}

const verifyFormRegisterFieldFill = (name, email, age) => name !== '' && email !== '' && age !== '';

const openDialogRequireField = () => {
    const dialog = document.querySelector('.modal-required-field')
    dialog.click();
}

const continueRegistrationModal = () => {
    const dialog = document.querySelector('.dialog-continuation-registration')
    dialog.click();
}

const setUserRegistrationData = (name, email, age) => {
    userRegistrationData.data = {
        name, 
        email,
        age
    }
}

if('customElements' in window) {
    customElements.define('app-form-register', FormRegister)
}