import { setUpGallery, currentIndex } from "./reservas.js";

const serverURL = 'https://json-server-79jb.onrender.com';


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
        if (!element.reserved.status && element.numberOfBeds === Number(numberHumans)) {
            arrayOfBedrooms.push(element);
        }
    });

    if (arrayOfBedrooms.length === 0 || startDate === '' || endDate === '') {
        alert('Ingresa todos los datos!')
    } else {
        renderBedrooms(arrayOfBedrooms)
    }
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

    const liPriceElm = document.createElement('li')
    liPriceElm.classList.add('price-details');

    const currentBedroom = arrayOfBedrooms[currentIndex];

    
    // Si quito estos dos console.log() métodos, la galeria deja de funcionar a veces,
    // aparece que es porque lee como "undefined" algunos valores del archivo json
    // lo que me hace suponer que los console.log() sirven como un tipo de await
    // y provocan una pequeña pausa que hace que los valores que normalmente dan
    // undefined lleguen y sean leidos correctamente.
    // Debo arreglar esto luego de finalizar todo el frontend
    console.log(arrayOfBedrooms)
    console.log(currentBedroom.numberOfBeds)



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

    const spanPriceElm = document.createElement('span');
    spanPriceElm.classList.add('price');
    spanPriceElm.textContent = 'BTC' 

    liPriceElm.textContent = `Precio Total por Noche: ${currentBedroom.price} `
    liPriceElm.appendChild(spanPriceElm);

    bedroomDetailsElm.appendChild(ulElm);
    ulElm.appendChild(liBedsElm);
    ulElm.appendChild(liMinibarElm);
    ulElm.appendChild(liJacuzziElm);
    ulElm.appendChild(liViewElm);
    ulElm.appendChild(liGravityElm);
    ulElm.appendChild(liPriceElm);

    const reservedDates = currentBedroom.reserved.date;
    renderCalendar(reservedDates);
}



function renderCalendar(roomData) {
    // Utilities to generate date ranges
    const generateDateRange = (start, end) => {
      const range = [];
      let current = new Date(start);
      const endDate = new Date(end);
      while (current <= endDate) {
        range.push(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
      }
      return range;
    };
  
    // Extract all reserved dates from an array of ranges
    const allReservedDates = roomData.flatMap(room =>
      room.reserved.status
        ? room.reserved.dates.flatMap(([start, end]) => generateDateRange(start, end))
        : []
    );
  
    // Calendar rendering logic
    const renderCalendar = (year, month) => {
      const calendar = document.getElementById("calendar").querySelector("tbody");
      const currentMonth = document.getElementById("current-month");
      calendar.innerHTML = "";
  
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
  
      // Update month/year display
      currentMonth.textContent = new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" });
  
      // Fill calendar
      let date = 1;
      for (let i = 0; i < 6; i++) { // 6 rows for weeks
        const row = document.createElement("tr");
        for (let j = 0; j < 7; j++) { // 7 columns for days
          const cell = document.createElement("td");
          if (i === 0 && j < firstDay) {
            cell.textContent = ""; // Empty cell before first day
          } else if (date > daysInMonth) {
            break; // Stop filling after last day
          } else {
            const currentDate = new Date(year, month, date).toISOString().split("T")[0];
            cell.textContent = date;
            if (allReservedDates.includes(currentDate)) {
              cell.classList.add("reserved");
            }
            date++;
          }
          row.appendChild(cell);
        }
        calendar.appendChild(row);
      }
    };
  
    // Initial state
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
  
    // Event listeners
    document.getElementById("calendarPrev").addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar(currentYear, currentMonth);
    });
  
    document.getElementById("calendarNext").addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar(currentYear, currentMonth);
    });
  
    // Initial render
    renderCalendar(currentYear, currentMonth);
  }
  