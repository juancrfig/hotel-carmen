import { filterBedrooms } from './serverInteraction.js'

const numberHumansInput = document.querySelector('#numero-personas')

//-------------------------------------------------------------------
//           LOGIC FOR RANGE OF VALID DATES
//-------------------------------------------------------------------

const todayDate = new Date();
const tomorrowDate = todayDate
const startingDateInput = document.querySelector('#fecha-ingreso');
const leavingDateInput = document.querySelector('#fecha-salida');

startingDateInput.addEventListener('change', () => {

    const startDate = startingDateInput.value;
    leavingDateInput.min = startDate;

    if (fechaSalida.value && fechaSalida.value < ingresoDate) {
        fechaSalida.value = '';
    }

})

startingDateInput.min = todayDate.toISOString().split('T')[0];
todayDate.setDate(todayDate.getDate() + 1);
leavingDateInput.min = tomorrowDate.toISOString().split('T')[0];


//-------------------------------------------------------------------
//                          GALLERY
//-------------------------------------------------------------------


const gallery = document.querySelector('.gallery');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        const imageCount = document.querySelectorAll('.img-gallery').length;
        let currentIndex = 0;

        function updateGalleryOne() {
          const imageWidth = window.innerWidth; // Dynamically get the width of each image in pixels
          gallery.style.transform = `translateX(-${currentIndex * imageWidth}px)`; // Use px instead of vw
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + imageCount) % imageCount;
            updateGalleryOne();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % imageCount;
            updateGalleryOne();
        });



//-------------------------------------------------------------------
//           MAIN FUNCTIONALITY OF THE PAGE
//-------------------------------------------------------------------

const consultarButton = document.querySelector('.booking-box button');

consultarButton.addEventListener('click', () => {

    const startDate = startingDateInput.value;
    const endDate = leavingDateInput.value;
    let numberHumans = numberHumansInput.value;

    if (new Date(startDate) > new Date(endDate) || 0 > numberHumans || numberHumans > 6) {
        alert('En este universo la fecha de ingreso debe ocurrir antes que la de salida! También recuerda que las habitaciones son de máximo 6 humanos!')
    } else {
        filterBedrooms(startDate, endDate, numberHumans);
    }
})
