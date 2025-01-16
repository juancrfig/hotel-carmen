const serverHome = 'http://localhost:3000';
const serverCampus = 'http://172.16.101.182:3000';
const serverURL = serverCampus;


export function addNewUser(username, password) {

    if (!checkUserExists(username)) {
        alert('El usuario ya existe!')
        return
    }

    fetch(`${serverURL}/credentials`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        alert('Usuario creado exitosamente!')
        location.reload()
    })
    .catch((error) => console.error('Error', error))
}

function checkUserExists(username) {

    fetch(`${serverURL}/credentials`)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            if (element.username === username) {
                return true
            }
        });
    })
}

export function logIn(username, password) {

    fetch(`${serverURL}/credentials`)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            if (element.username === username && element.password === password) {
                alert('Sesión iniciada exitosamente!')
                return true
            }
        });
    })

}
