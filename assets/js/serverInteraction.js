const serverHome = 'http://localhost:3000/';

const sendButton = document.getElementById('sign-up-btn');
const inputSignUpUser = document.querySelector('.sign-up-user');
const inputSignUpPass = document.querySelector('.sign-up-pass');

const sendLogBtn = document.getElementById('log-in-btn');
const inputLogInUser = document.querySelector('.log-in-user');
const inputLogInPass = document.querySelector('.log-in-pass');


function ensureCredentials() {
    fetch(`${serverHome}/credentials`)
      .then(response => {
        if (response.status === 404) {
          // Credentials key doesn't exist, create it
          fetch(`${serverHome}/credentials`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify([]), // Create empty array initially
          })
          .then(response => response.json())
          .then(result => console.log('Credentials initialized:', result))
          .catch(error => console.error('Error initializing credentials:', error));
        }
      })
      .catch(error => console.error('Error checking credentials:', error));
  }


sendLogBtn.addEventListener('click', () => {
    const user = inputLogInUser.value;
    const pass = inputLogInPass.value;
 
    if (user && pass) {
        checkLogIn(user, pass);
    } else {
        alert('Llena todos los campos!')
    }     
    
})

function checkLogIn(username, password) {

    fetch(serverHome)
    .then(response => response.json())
    .then(data => console.log(data))

}

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
    fetch(`${serverHome}/credentials`)
        .then(response => response.json())
        .then(data => {
            // If the credentials array doesn't exist, initialize it
            if (!data || !Array.isArray(data)) {
                data = [];
            }
            
            // Push the new user credentials into the array
            data.push({ username, password });

            // Update the credentials array in the database
            return fetch(`${serverHome}/credentials`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            location.reload(); // Reload the page after successful POST
            return response.json();
        })
        .then(data => {
            console.log(`User ${username} added successfully`);
        })
        .catch(error => {
            console.error("Error adding the user", error);
        });
}
