import { addNewUser, logIn } from "./serverInteraction.js";

// NAV MENU 

const navButton = document.querySelector('.nav-button');
const navMenu = document.querySelector('.nav-menu');
const overlay = document.querySelector('.overlay');


const sendButton = document.getElementById('sign-up-btn');
const inputSignUpUser = document.querySelector('.sign-up-user');
const inputSignUpPass = document.querySelector('.sign-up-pass');

const inputLogInUser = document.querySelector('.log-in-user');
const inputLogInPass = document.querySelector('.log-in-pass');

navButton.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

function toggleMenu() {
  navMenu.classList.toggle('active');
  overlay.classList.toggle('active');
}

// ----------------------------------------------------------------
//              LOGIC FOR REGISTERING A NEW USER
// ----------------------------------------------------------------


sendButton.addEventListener('click', () => {

  const user = inputSignUpUser.value;
  const pass = inputSignUpPass.value;

  if (user && pass) {
      addNewUser(user, pass)
  } else {
      alert('Llena todos los campos!')
  }    
})

// ----------------------------------------------------------------
//              LOGIC FOR LOGGING IN A NEW USER
// ----------------------------------------------------------------

const sendLogBtn = document.getElementById('log-in-btn');


sendLogBtn.addEventListener('click', () => {
  const user = inputLogInUser.value;
  const pass = inputLogInPass.value;

  if (user && pass) {
      logIn(user, pass);
  } else {
      alert('Llena todos los campos!')
  }     
  
})


// ----------------------------------------------------------------
//             MODAL ANIMATIONS AND LOGIC
// ----------------------------------------------------------------



const logInmodal = document.getElementById('modalLogIn')
const openLogInModalBtn = document.querySelector('.openModalLogIn');
const closeLogInBtn = document.querySelector('.close-log-btn');


// Get modal and buttons
const modal = document.getElementById('modalSignUp');
const openModalBtn = document.querySelector('.openModalSignUp');
const closeBtn = document.querySelector('.close-btn');

// Open the modal

function openModalSign() {
	modal.style.display = 'flex'; //
}
openModalBtn.addEventListener('click', openModalSign);

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

function openModalLog() {
	logInmodal.style.display = 'flex';

}
openLogInModalBtn.addEventListener('click', openModalLog);

closeLogInBtn.addEventListener('click', () => {
  logInmodal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === logInmodal) {
    logInmodal.style.display = 'none';
  }
})


// ----------------------------------------------------------------
//              GALLERY
// ----------------------------------------------------------------


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




// ----------------------------------------------------------------
//   MAIN
// ----------------------------------------------------------------

const topTextUserBox = document.querySelector('#user-section-username')
const bottomTextUserBox = document.querySelector('#texto-inferior')
const logOutBtn = document.querySelector('#logout-btn')

document.addEventListener("DOMContentLoaded", function () {

	if (sessionStorage.getItem('isLoggedIn')) {
      
		topTextUserBox.textContent = 'Hola';
		bottomTextUserBox.textContent = sessionStorage.getItem('username');

		openModalBtn.removeEventListener('click', openModalSign);
		openLogInModalBtn.removeEventListener('click', openModalLog);

		logOutBtn.classList.toggle('disabled');

		logOutBtn.addEventListener('click', () => {
			sessionStorage.clear();
			location.reload();
		})
  	}
});

