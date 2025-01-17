import { setUpGallery, currentIndex } from "./reservas.js";

const serverHome = 'http://localhost:3000';
const serverCampus = 'http://172.16.101.182:5000';
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

        if (!flag) {
            alert('Datos Incorrectos!')         
        }
    })
}

//-------------------------------------------------------------------
//           LOGIC FOR FILTERING BEDROOMS
//-------------------------------------------------------------------

const arrayOfBedrooms = [];
const galleryElement = document.querySelector('.gallery');

export async function filterBedrooms(startDate, endDate, numberHumans) {

    arrayOfBedrooms.length = 0;
    const response = await fetch(`${serverURL}/bedrooms`);
    const data = await response.json();

    data.forEach((element) => {
        if (!element.reserved.status) {
            arrayOfBedrooms.push(element);
        }
    });

    renderBedrooms(arrayOfBedrooms)
}

function renderBedrooms(arrayOfBedrooms) {

    arrayOfBedrooms.forEach( (bedroom) => {

        const imageURL = bedroom.image;

        const imgElm = document.createElement('img');
        imgElm.setAttribute('src', imageURL);
        imgElm.setAttribute('class', 'img-gallery');
        
        galleryElement.appendChild(imgElm); 
    })

    setUpGallery();

    renderDetails()
}

const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const bedroomDetailsElm = document.querySelector('.bedroom-details');

prevBtn.addEventListener('click', () => {
    renderDetails(currentIndex)
})

nextBtn.addEventListener('click', () => {
    renderDetails(currentIndex)
})

function renderDetails(currentIndex=0) {

    bedroomDetailsElm.innerHTML = '';
    const ulElm = document.createElement('ul');

    const liBedsElm = document.createElement('li')
    liBedsElm.classList.add('bed-details');

    const liMinibarElm = document.createElement('li')
    liMinibarElm.classList.add('minibar-details');

    const liJacuzziElm = document.createElement('li')
    liJacuzziElm.classList.add('jacuzzi-details');

    const liViewElm = document.createElement('li')
    liViewElm.classList.add('view-details');

    const liGravityElm = document.createElement('li')
    liMinibarElm.classList.add('gravity-details');


    const currentBedroom = arrayOfBedrooms[currentIndex];

    liBedsElm.textContent = `Número de Camas: ${currentBedroom.numberOfBeds}`;

    if (currentBedroom.minibar) {
        liMinibarElm.textContent = `Minibar: Sí`;
    } else {
        liMinibarElm.textContent = `Minibar: No`;
    }

    if (currentBedroom.jacuzzi) {
        liJacuzziElm.textContent = `Jacuzzi: Sí`;
    } else {
        liJacuzziElm.textContent = `Jacuzzi: No`;
    }

    liViewElm.textContent = `Vista: ${currentBedroom.view}`;

    if (currentBedroom.artificialGravity) {
        liGravityElm.textContent = `Gravedad Artificial: Sí`;
    } else {
        liGravityElm.textContent = `Gravedad Artificial: No`;       
    }

    bedroomDetailsElm.appendChild(ulElm);
    ulElm.appendChild(liBedsElm);
    ulElm.appendChild(liMinibarElm);
    ulElm.appendChild(liJacuzziElm);
    ulElm.appendChild(liViewElm);
    ulElm.appendChild(liGravityElm);
}