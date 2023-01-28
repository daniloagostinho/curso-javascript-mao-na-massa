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

let nameInputValue;
let emailInputValue;
let ageInputValue;

const handleFormRegister = async () => {
    nameInputValue = document.querySelector('.nameInputValue').value;
    emailInputValue = document.querySelector('.emailInputValue').value;
    ageInputValue = document.querySelector('.ageInputValue').value;

    setUserRegistrationData(nameInputValue, emailInputValue, ageInputValue)

    console.log('userRegistrationData -->> ', userRegistrationData)

    if(verifyEmptyValues(nameInputValue, emailInputValue, ageInputValue)) {
        openDialogContinuationRegistration();
    } else {
        openDialogRequireField();
    }
}

const verifyEmptyValues = (name, email, age) => {
    if(name !== '' && email !== '' && age !== '') {
        return true;
    }

    return false;
}

const openDialogRequireField = () => {
    const dialog = document.querySelector('.modal-required-field')
    dialog.click();
}

const openDialogContinuationRegistration = () => {
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