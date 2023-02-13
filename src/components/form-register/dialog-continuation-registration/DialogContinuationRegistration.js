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

let uploadedAvatar;
let password;
let confirmPassword;

const setImgAvatar = () => {
    const imgAvatar = document.querySelector('.avatar')
    imgAvatar.src = "assets/images/avatar-default.png"
}

const loadValueInput = (name, email, age) => {
    document.querySelector('.nameInput').value = name;
    document.querySelector('.emailInput').value = email;
    document.querySelector('.ageInput').value = age;
}

const verifyUserRegistrationData = () => {
    window.userRegistrationData = new Proxy({}, {
        set: function (target, property, value) {

            const name = value.name;
            const email = value.email;
            const age = value.age;

            setImgAvatar();

            loadValueInput(name, email, age)
            target[property] = value;
        }
    })
}


const uploadAvatar = (event) => {
    if(event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];

        const reader = new FileReader();

        reader.onload = (e) => (document.querySelector('.avatar').src = reader.result)

        reader.readAsDataURL(file);

        uploadedAvatar = file;
    }
}

verifyUserRegistrationData();

const sendDataToBackend = async () => {
    const name = document.querySelector('.nameInput').value;
    const email = document.querySelector('.emailInput').value;
    const age = document.querySelector('.ageInput').value;
    const image = uploadedAvatar;
    const password = document.querySelector('.passwordInput').value;
    const confirmPassword = document.querySelector('.confirmPasswordInput').value;

    const payload = {
        name,
        email,
        age,
        image,
        password,
        confirmPassword
    }


    if(checkEmptyModalFields(name, email, age, image, password, confirmPassword)) {
        if(checkPasswordEquals()) {
            configCloseModalSet();
            await window.registerUser('http://localhost:3000/auth/register/user', payload)
                .then(catchApiDialogError)
                .then(response => response.json())
                .then(() => {
                    alert('Cadastro realizado com sucesso!')
                    onNavigate('/')
                })
                .catch(handleDialogErrorTypes)
        } else {
            alert('As senhas não são iguais!')
            return;
        }
    } else {
        
        const btnCloseModal = document.querySelector('.btn-continuation-register')
        btnCloseModal.removeAttribute('data-dismiss')
        alert('Preencha os campos vazios!')
    }
}

const handleDialogErrorTypes = (error) => {
    if(error = 'Error: Unprocessable Entity') {
        alert('Já existe uma conta com esse e-mail!');
    }
}

const catchApiDialogError = (response) => {
    if(!response.ok) {
        throw Error(response.statusText)
    }

    return response;
}

const showErrorMessage = () => {
    const errorMessage = document.querySelector('.errorMessage')
    errorMessage.style.display = 'block';
}

const hideErrorMessage = () => {
    const errorMessage = document.querySelector('.errorMessage')
    errorMessage.style.display = 'none';
}

const configCloseModalSet = () => {
    const btnCloseModal = document.querySelector('.btn-continuation-register')
    btnCloseModal.setAttribute('data-dismiss', 'modal')
}

const configCloseModalRemove = () => {
    const btnCloseModal = document.querySelector('.btn-continuation-register')
    btnCloseModal.removeAttribute('data-dismiss')
}

const checkEmptyModalFields = (name, email, age, image, password, confirmPassword) => {
    if(
        name !== ''
        && email !== ''
        && age !== ''
        && image !== undefined
        && password !== ''
        && confirmPassword !== ''
    ) {
        return true;
    }

    return false;
}

const getValuePassword = (event) => {
    password = event.target.value;
    checkPasswordEquals();
    checkPassworsNotEquals();
}

const getValueConfirmPassword = (event) => {
    confirmPassword = event.target.value;
    checkPasswordEquals();
    checkPassworsNotEquals();
}

const checkPasswordEquals = () => {
    if(password !== '' && confirmPassword !== '' && password == confirmPassword) {
        hideErrorMessage()
        return true;
    }

    return false;
}

const checkPassworsNotEquals = () => {
    if(password !== '' && confirmPassword !== '' && password != confirmPassword) {
        showErrorMessage();
        configCloseModalRemove();
    }
}


if('customElements' in window) {
    customElements.define('app-dialog-continuation-registration', DialogContinuationRegistration)
}