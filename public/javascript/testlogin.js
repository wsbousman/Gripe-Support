
const loginHandler = async (event) => {
    event.preventDefault();
    console.log('hello')
    const username = document.querySelector('[name="username-input"]').value.trim();
    const password = document.querySelector('[name="password-input"]').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok){
            document.location.replace('/test/success');
        } else {
            if(response.statusText = 500) {
                alert('Wrong user info');
            }
        }
    }
}


document.querySelector('#login-form').addEventListener('submit', loginHandler);