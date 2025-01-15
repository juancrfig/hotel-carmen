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