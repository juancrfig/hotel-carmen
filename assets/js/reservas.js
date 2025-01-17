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
const images = document.querySelectorAll('.gallery img'); // Collect images directly
const imageCount = images.length;
let currentIndex = 0;

function updateGallery() {
    const imageWidth = images[0].clientWidth; // Get width of first image
    gallery.style.transform = `translateX(-${currentIndex * imageWidth}px)`; // Update translation
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + imageCount) % imageCount; // Loop back to last image if current is 0
    updateGallery();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imageCount; // Loop back to first image if current reaches the last
    updateGallery();
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
        const bedroomsArray = filterBedrooms(startDate, endDate, numberHumans);
    }
})
