const serverHome = 'http://localhost:3000/posts';

const sendButton = document.getElementById('sign-up-btn');
const inputSignUpUser = document.querySelector('.sign-up-user');
const inputSignUpPass = document.querySelector('.sign-up-pass');

sendButton.addEventListener('click', () => {

    const user = inputSignUpUser.value;
    const pass = inputSignUpPass.value;

    if (user && pass) {
        postNewUser(user, pass)
    } else {
        alert('Llena todos los campos!')
    }    
  })


function postNewUser(username, password) {
    
    fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);      
        }
        location.reload();
        return response.json();
    })
    .then(data => {
        console.log(`User ${username} add successfully`)
    })
    .catch(error => {
        console.error("Error adding the user")
    })
}
