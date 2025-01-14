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


// GALLERY

const gallery = document.querySelector('.gallery-wrapper');
const gallerySpeed = 1; // Speed factor for scrolling

let scrollAmount = 0;
const step = () => {
    scrollAmount += gallerySpeed;
    if (scrollAmount >= gallery.scrollWidth / 2) {
        scrollAmount = 0; // Reset scrolling to achieve infinite scrolling
    }
    gallery.style.transform = `translateX(${-scrollAmount}px)`;
    requestAnimationFrame(step);
};

// Disable default animation if JavaScript is enabled
gallery.style.animation = 'none';
requestAnimationFrame(step);