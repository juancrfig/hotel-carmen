import { setUpGallery, currentIndex, setCurrentIndex } from "./reservas.js";

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

let isSearching = false;
const arrayOfBedrooms = [];
const galleryElement = document.querySelector('.gallery');
const bedroomDetailsElm = document.querySelector('.bedroom-details');

export async function filterBedrooms(numberHumans) {

    if (isSearching) return;
    try {
        isSearching = true;

        // Clear previous results
        arrayOfBedrooms.length = 0;
        galleryElement.innerHTML = '';
        bedroomDetailsElm.innerHTML = '';

        const response = await fetch(`${serverURL}/bedrooms`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        data.forEach((element) => {
            if (element.numberOfBeds === Number(numberHumans)) {
                arrayOfBedrooms.push(element);
            }
        });

        if (arrayOfBedrooms.length === 0) {
            alert('No se encontraron habitaciones disponibles con los criterios seleccionados.');
            return;
        }
        
        await renderBedrooms(arrayOfBedrooms);

    } catch (error) {
        console.error('Error fetching bedrooms:', error);
        alert('Error al cargar las habitaciones. Por favor, intente nuevamente.');
    } finally {
        isSearching = false;
    }
}

async function renderBedrooms(arrayOfBedrooms) {
    try {
        // Clear existing gallery
        galleryElement.innerHTML = '';
        
        // Create and append all images
        const imagePromises = arrayOfBedrooms.map((bedroom) => {
            return new Promise((resolve, reject) => {
                const imgElm = document.createElement('img');
                imgElm.onload = () => resolve();
                imgElm.onerror = () => {
                    console.error(`Failed to load image: ${bedroom.image}`);
                    resolve(); // Resolve anyway to not block other images
                };
                imgElm.setAttribute('src', bedroom.image);
                imgElm.setAttribute('class', 'img-gallery');
                galleryElement.appendChild(imgElm);
            });
        });

        await Promise.all(imagePromises);
        
        // Reset gallery state
        setCurrentIndex(0);  // Use the new function instead of direct assignment
        setUpGallery();
        renderDetails(0);
        
    } catch (error) {
        console.error('Error rendering bedrooms:', error);
        alert('Error al mostrar las habitaciones. Por favor, intente nuevamente.');
    }
}

const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Update event listeners to check if search is in progress
prevBtn.addEventListener('click', () => {
    if (!isSearching && arrayOfBedrooms.length > 0) {
        renderDetails(currentIndex);
    }
});

nextBtn.addEventListener('click', () => {
    if (!isSearching && arrayOfBedrooms.length > 0) {
        renderDetails(currentIndex);
    }
});

function renderDetails(index = 0) {
    if (!arrayOfBedrooms.length || index >= arrayOfBedrooms.length) {
        console.error('No bedrooms available or invalid index');
        return;
    }

    const currentBedroom = arrayOfBedrooms[index];
    if (!currentBedroom) {
        console.error('Unable to find bedroom data for index:', index);
        return;
    }

    bedroomDetailsElm.innerHTML = '';
    const ulElm = document.createElement('ul');

    const details = [
        { class: 'bed-details', text: `Número de Camas: ${currentBedroom.numberOfBeds}` },
        { class: 'minibar-details', text: `Minibar: ${currentBedroom.minibar ? 'Sí' : 'No'}` },
        { class: 'jacuzzi-details', text: `Jacuzzi: ${currentBedroom.jacuzzi ? 'Sí' : 'No'}` },
        { class: 'view-details', text: `Vista: ${currentBedroom.view}` },
        { class: 'gravity-details', text: `Gravedad Artificial: ${currentBedroom.artificialGravity ? 'Sí' : 'No'}` },
        { class: 'price-details', text: `Precio Total por Noche: ${currentBedroom.price} BTC` }
    ];

    details.forEach(detail => {
        const li = document.createElement('li');
        li.classList.add(detail.class);
        li.textContent = detail.text;
        ulElm.appendChild(li);
    });

    bedroomDetailsElm.appendChild(ulElm);
    renderCalendar(currentBedroom.reserved.dates);

    roomID = currentBedroom.id;
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
  
    // Extract reserved dates for a single room
    const allReservedDates = roomData
      ? roomData.reserved.dates.flatMap(([start, end]) => generateDateRange(start, end))
      : [];
  
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

let roomID = 1;


export function reservarHabitacion(startDate, endDate) {
  
    // Step 1: Fetch room details
    fetch(`${serverURL}/bedrooms/${roomID}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch room details: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        // Step 2: Check if the room is already reserved
        if (data.reserved && data.reserved.status) {
          console.log(`The room ${roomID} is already reserved.`);
          return; // Exit if the room is already reserved
        }
  
        // Step 3: Prepare reservation details
        const reservationDetails = {
          reserved: {
            status: true,
            dates: [[startDate, endDate]] // Add new reservation
          }
        };
  
        // Step 4: Update reservation on the server
        return fetch(`${serverURL}/bedrooms/${roomID}`, {
          method: "PATCH", // Use PATCH to update reservation
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(reservationDetails)
        });
      })
      .then(postResponse => {
        if (!postResponse.ok) {
          throw new Error(`Failed to reserve room: ${postResponse.statusText}`);
        }
        console.log(`Room ${roomID} reserved successfully from ${startDate} to ${endDate}.`);
        window.location.reload()
      })
      .catch(error => {
        // Handle errors during any step
        console.error(`Error during reservation: ${error.message}`);
      });
  }
  