const todayDate = new Date();
const tomorrowDate = todayDate
const startingDateInput = document.querySelector('#fecha-ingreso');
const leavingDateInput = document.querySelector('#fecha-salida');

startingDateInput.min = todayDate.toISOString().split('T')[0];
todayDate.setDate(todayDate.getDate() + 1);
leavingDateInput.min = tomorrowDate.toISOString().split('T')[0];

