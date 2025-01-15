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
const modal = document.getElementById('modal');
const openModalBtn = document.querySelector('.openModalSignUp');
const closeBtn = document.querySelector('.close-btn');
const sendButton = document.getElementById('sign-up-btn');
const inputSignUpUser = document.querySelector('.sign-up-user');
const inputSignUpPass = document.querySelector('.sign-up-pass');

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

sendButton.addEventListener('click', () => {
  postNewUser(inputSignUpUser.value, inputSignUpPass.value)
})



// // GALLERY

// const gallery = document.querySelector('.gallery-wrapper');
// const gallerySpeed = 1; // Speed factor for scrolling

// let scrollAmount = 0;
// const step = () => {
//     scrollAmount += gallerySpeed;
//     if (scrollAmount >= gallery.scrollWidth / 2) {
//         scrollAmount = 0; // Reset scrolling to achieve infinite scrolling
//     }
//     gallery.style.transform = `translateX(${-scrollAmount}px)`;
//     requestAnimationFrame(step);
// };

// // Disable default animation if JavaScript is enabled
// gallery.style.animation = 'none';
// requestAnimationFrame(step);



//  SERVER

const serverHomeUsers = 'http://localhost:3000/users';
// const serverURL = 'http://172.16.101.182:3000/posts';


function postNewUser(username, password) {

  fetch(serverHomeUsers, {
    method: 'POST',
    headers: {
      'Content-Type': 'aaplication/json'
      },
    body: JSON.stringify({
      username: username,
      password: password,
    }) 
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);      
      }
      return response.json();
    })
    .then(data => {
      console.log(`User ${username} add successfully`)
    })
    .catch(error => {
      console.error("Error adding the user")
    })
}


// Fetch posts from the JSON server
// fetch(serverHomeUsers)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//   })
//   .catch(error => console.error('Error fetching posts:', error))

// fetch(serverURL, {
//   method: 'POST', 
//   headers: {
//     'Content-Type': 'application/json' 
//   },
//   body: JSON.stringify({
//     title: 'users',  
//   })
// })
//   .then(response => response.json())  
//   .then(data => console.log('Post created:', data)) 
//   .catch(error => console.error('Error:', error)); 
  

// fetch('http://172.16.101.182:3000/posts')
//   .then(response => response.json())  // Parse the response as JSON
//   .then(posts => {
//     // Iterate over all posts and delete them
//     posts.forEach(post => {
//       fetch(`http://172.16.101.182:3000/posts/${post.id}`, {
//         method: 'DELETE'  // DELETE method to remove the post
//       })
//         .then(response => response.json())  // Parse the response as JSON
//         .then(data => console.log(`Post ${post.id} deleted`))  // Log successful deletion
//         .catch(error => console.error('Error deleting post:', error));  // Handle any errors
//     });
//   })