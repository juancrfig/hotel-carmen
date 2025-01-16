const serverHome = 'http://localhost:3000';
const serverCampus = 'http://172.16.101.182:4000';
const serverURL = serverCampus;


export function addNewUser(username, password) {

    if (checkUserExists(username)) {

        alert('El usuario ya existe!')

    } else {

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
        let flag = false;
        data.forEach(element => {
            if (element.username === username && element.password === password) {

                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('username', username);
                alert('Sesión iniciada exitosamente!');
                location.reload();
                flag = true;
            }    
        });

        if (!valid) {
            alert('Datos Incorrectos!')         
        }
    })
}

function checkSession() {
    if (sessionStorage.getItem("isLoggedIn") !== "true") {
        alert("You are not logged in!");
        // Redirect to login page
        window.location.href = "login.html";
    }
}

function logout() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("username");
    window.location.href = "../../index.html";
}



//-------------------------------------------------------------------
//           LOGIC FOR FILTERING BEDROOMS
//-------------------------------------------------------------------

export function filterBedrooms(startDate, endDate, numberHumans) {

    console.log(startDate)
    console.log(endDate)
    console.log(numberHumans)

}