// This gets linked in sign-up.handlebars
async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password1 = document.querySelector('#password-signup1').value.trim();
    const password2 = document.querySelector('#password-signup2').value.trim();

    
    if( username && password1 === password2) {
        const password = password1;

        const response = await fetch('/api/users' , {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok) {
           document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);