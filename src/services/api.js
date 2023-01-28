window.registerUser = (url, user) => {
    console.log('user -->> ', user)
    const formData = new FormData();

    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('age', user.email)
    formData.append('image', user.image)
    formData.append('password', user.password)
    formData.append('confirmPassword', user.confirmPassword)

    return fetch(url, {
        method: 'POST',
        body: formData
    })
}