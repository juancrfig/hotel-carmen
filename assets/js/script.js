// NAV MENU 

const navButton = document.querySelector('.nav-button');
const navMenu = document.querySelector('.nav-menu');
const overlay = document.querySelector('.overlay');

navButton.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

function toggleMenu() {
  navMenu.classList.toggle('active');
  overlay.classList.toggle('active');
}


// Get modal and buttons
const modal = document.getElementById('modalSignUp');
const openModalBtn = document.querySelector('.openModalSignUp');
const closeBtn = document.querySelector('.close-btn');

// Open the modal
openModalBtn.addEventListener('click', () => {
  modal.style.display = 'flex'; // Show the modal
});

// Close the modal when the "X" button is clicked
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none'; // Hide the modal
});

// Close the modal when clicking anywhere outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});


const logInmodal = document.getElementById('modalLogIn')
const openLogInModalBtn = document.querySelector('.openModalLogIn');
const closeLogInBtn = document.querySelector('.close-log-btn');

openLogInModalBtn.addEventListener('click', () => {
  logInmodal.style.display = 'flex';
});

closeLogInBtn.addEventListener('click', () => {
  logInmodal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === logInmodal) {
    logInmodal.style.display = 'none';
  }
})



// GALLERY

const gallery = document.querySelector('.gallery');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        const imageCount = document.querySelectorAll('.img-gallery').length;
        let currentIndex = 0;

        function updateGalleryOne() {
            gallery.style.transform = `translateX(-${currentIndex * 300}px)`;
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + imageCount) % imageCount;
            updateGalleryOne();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % imageCount;
            updateGalleryOne();
        });


const galleryTwo = document.querySelector('.galleryTwo');
        const prevBtnTwo = document.querySelector('.prevTwo');
        const nextBtnTwo = document.querySelector('.nextTwo');
        const imageCountTwo = document.querySelectorAll('.img-galleryTwo').length;
        let currentIndexTwo = 0;

        function updateGallery() {
            galleryTwo.style.transform = `translateX(-${currentIndexTwo * 300}px)`;
        }

        prevBtnTwo.addEventListener('click', () => {
            currentIndexTwo = (currentIndexTwo - 1 + imageCountTwo) % imageCountTwo;
            updateGallery();
        });

        nextBtnTwo.addEventListener('click', () => {
            currentIndexTwo = (currentIndexTwo + 1) % imageCountTwo;
            updateGallery();
        });