const serverURL = 'https://json-server-79jb.onrender.com';

const userBookings = [];
const username = sessionStorage.getItem('username');
const ulElm = document.querySelector('ul');

// alert('Click en la reserva que quieras cancelar!')


async function getUserBookings() {
    const response = await fetch(`${serverURL}/bedrooms`);
    const habitaciones = await response.json();
    
    habitaciones.forEach(habitacion => {
        if (habitacion.reserved) {
            const arraysDates = habitacion.reserved.date;
            arraysDates.forEach(dateRange => {
                if (dateRange[2] === username) {
                    userBookings.push(dateRange);
                }
            });
        }
    });
}

async function loadBookings() {
    try {
        await getUserBookings();
        showUserBookings();
        allowCancelation();

    } catch (error) {
        console.error('Error fetching user bookings:', error);
    }
}


function showUserBookings() {

    userBookings.forEach( booking => {

        const liElm = document.createElement('li');
        liElm.textContent = `Reserva desde ${booking[0]} hasta ${booking[1]}`

        ulElm.appendChild(liElm);
    })
}


function allowCancelation() {

    const allBookings = document.querySelectorAll('li');

    allBookings.forEach( booking => {

        booking.addEventListener('click', (event) => {
            cancelBooking(event.target);
        })

    })

}


function cancelBooking(target) {
    const liElemento = target.textContent.split(' ');
    const startDate = liElemento[2];
    const endDate = liElemento[4];
    const username = sessionStorage.getItem('username');

    fetch(`${serverURL}/bedrooms`)
        .then(response => response.json())
        .then(bedrooms => {
            bedrooms.forEach(bedroom => {
                const reservedDates = bedroom.reserved.date;

                // Find and remove the specific booking
                const indexToRemove = reservedDates.findIndex(dateRange =>
                    dateRange[0] === startDate &&
                    dateRange[1] === endDate &&
                    dateRange[2] === username
                );

                if (indexToRemove !== -1) {
                    reservedDates.splice(indexToRemove, 1); // Remove the booking

                    // If no bookings remain, update reserved.status to false
                    const updatedReserved = {
                        ...bedroom.reserved,
                        status: reservedDates.length > 0,
                        date: reservedDates
                    };

                    // Send the updated bedroom object back to the server
                    const updatedBedroom = {
                        ...bedroom,
                        reserved: updatedReserved
                    };

                    fetch(`${serverURL}/bedrooms/${bedroom.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedBedroom)
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to update booking');
                        }
                        return response.json();
                    })
                    .then(updatedData => {
                        console.log(`Booking from ${startDate} to ${endDate} canceled successfully.`);
                        console.log('Updated bedroom data:', updatedData);
                        window.location.reload()
                    })
                    .catch(error => {
                        console.error('Error updating the booking:', error);
                    });
                }
            });
        })
        .catch(error => {
            console.error('Error fetching bedrooms:', error);
        });
}



loadBookings();


document.addEventListener('DOMContentLoaded', function() {
    const modalOverlay = document.getElementById('modalOverlay');
    const closeButton = document.getElementById('closeButton');

    // Function to close modal
    function closeModal() {
        modalOverlay.style.display = 'none';
    }

    // Show modal when page loads
    modalOverlay.style.display = 'block';

    // Close button event listener
    closeButton.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Optional: Add escape key listener to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});