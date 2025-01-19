import { filterBedrooms, reservarHabitacion } from './serverInteraction.js'

const numberHumansInput = document.querySelector('#numero-personas');
const reservarBox = document.querySelector('.reservar-box');
const startingDateInput = document.querySelector('#fecha-ingreso');
const leavingDateInput = document.querySelector('#fecha-salida');
const reservarBtnElm = document.querySelector('.reservar-btn');


//-------------------------------------------------------------------
//           LOGIC FOR RANGE OF VALID DATES
//-------------------------------------------------------------------

if (window.location.pathname.includes("reservas.html")) {

    //-------------------------------------------------------------------
    //           MAIN FUNCTIONALITY OF THE PAGE
    //-------------------------------------------------------------------

    const todayDate = new Date();
    const tomorrowDate = new Date(todayDate); // Create a new Date object for tomorrow, so it doesn't affect todayDate

    startingDateInput.addEventListener('change', () => {
        const startDate = startingDateInput.value;
        leavingDateInput.min = startDate;
    });

    startingDateInput.min = todayDate.toISOString().split('T')[0];

    todayDate.setDate(todayDate.getDate() + 1);
    leavingDateInput.min = tomorrowDate.toISOString().split('T')[0];

    const availableTitle = document.querySelector('#available-title');
    const bedroomDetailsElm = document.querySelector('.bedroom-details');
    const galleryContainerElm = document.querySelector('.gallery-container');
	const consultarButton = document.querySelector('.booking-box button');
;

    consultarButton.addEventListener('click', () => {
        
        const calendarControlsElm = document.querySelector('.controls');
		const calendar = document.querySelector('.calendar-container');

        const startDate = startingDateInput.value;
        const endDate = leavingDateInput.value;
        let numberHumans = numberHumansInput.value;

        if ( numberHumans > 6 ) {
            alert('Recuerda que las habitaciones son de máximo 6 humanos!')
        } else if (numberHumans === '') {
            alert('Ingrese todos los datos!');
        } else {
            	availableTitle.classList.remove('disabled');
            	bedroomDetailsElm.classList.remove('disabled');
            	galleryContainerElm.classList.remove('disabled');
				calendarControlsElm.classList.remove('disabled');
				calendar.classList.remove('disabled');
                reservarBox.classList.remove('disabled');



            filterBedrooms(numberHumans);
        }
})

}


//-------------------------------------------------------------------
//                          GALLERY
//-------------------------------------------------------------------

export let currentIndex = 0;

export function setCurrentIndex(newIndex) {
    currentIndex = newIndex;
}

export function setUpGallery() {

    const gallery = document.querySelector('.gallery');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const images = document.querySelectorAll('.gallery img'); // Collect images directly
    const imageCount = images.length;

    setCurrentIndex(0);
	updateGallery(images, gallery, currentIndex)

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + imageCount) % imageCount; // Loop back to last image if current is 0
        updateGallery(images, gallery, currentIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imageCount; // Loop back to first image if current reaches the last
        updateGallery(images, gallery, currentIndex);
    });
    

}

function updateGallery(images, gallery, currentIndex) {
    const imageWidth = images[0].clientWidth; // Get width of first image
    gallery.style.transform = `translateX(-${currentIndex * imageWidth}px)`; // Update translation
}



// LOGICA PARA HACER Y CHEQUEAR RESERVAS 

reservarBtnElm.addEventListener('click', () => {

    reservarHabitacion(startingDateInput.value, leavingDateInput.value)
    
})