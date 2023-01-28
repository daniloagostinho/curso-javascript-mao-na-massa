class DialogContinuationRegistration extends HTMLElement {
    constructor() {
        super();

        console.log('working -> ', this)

        fetch('src/components/form-register/dialog-continuation-registration/DialogContinuationRegistration.html')
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

const setImgAvatar = () => {
    const imgAvatar = document.querySelector('.avatar')
    imgAvatar.src = "assets/images/avatar-default.png"
}

setTimeout(() => {
    setImgAvatar()
}, 3000)

const loadValueInput = (name, email, age) => {
    document.querySelector('.nameInput').value = name;
    document.querySelector('.emailInput').value = email;
    document.querySelector('.ageInput').value = age;
}

const verifyUserRegistrationData = () => {
    userRegistrationData = new Proxy({}, {
        set: function (target, property, value) {
            console.log(target, property, value)

            const name = value.name;
            const email = value.name;
            const age = value.age;

            loadValueInput(name, email, age)
            target[property] = value;
        }
    })
}

verifyUserRegistrationData();

if('customElements' in window) {
    customElements.define('app-dialog-continuation-registration', DialogContinuationRegistration)
}