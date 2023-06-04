/*const $days = document.querySelector('span[data-days]'),
  $hours = document.querySelector('span[data-hours]'),
  $minutes = document.querySelector('span[data-minutes]'),
  $seconds = document.querySelector('span[data-seconds]'),
  $datetime = document.getElementById('datetime-picker');

//fecha a futuro

const countdownDate = new Date('Dec 25, 2023 00:00:00').getTime();
let interval = setInterval(function () {
  //obtener fecha actual milisegundos
  const now = new Date().getTime();
  //obtener las distancias entre ambas fechas
  let distance = countdownDate - now;
  //calculos a dias, horas, minutos y segundos
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //escribimos resultados
  $days.innerHTML = days;
  $hours.innerHTML = hours;
  $minutes.innerHTML = minutes;
  $seconds.innerHTML = ('0' + seconds).slice(-2);
}, 1000);*/

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init();
// constantes funcionales
const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const resetButton = document.querySelector('[data-reset]');

// constantes de tiempo
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

// Variable para almacenamiento
let countInterval;
let remainingTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
};

const convertMs = ms => {
  const duration = new Date(ms);

  const days = duration.getUTCDate() - 1;
  const hours = duration.getUTCHours();
  const minutes = duration.getUTCMinutes();
  const seconds = duration.getUTCSeconds();

  return { days, hours, minutes, seconds };
};

const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

const startCountdown = () => {
  startButton.setAttribute('hidden', '');
  stopButton.removeAttribute('hidden');
  stopButton.disabled = false;
  const selectedDate = new Date(datetimePicker.value).getTime();
  const currentDate = Date.now();
  remainingTime = selectedDate - currentDate;
  if (remainingTime <= 0) {
    stopCountdown();
    startButton.removeAttribute('hidden');
    startButton.disabled = true;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(remainingTime);

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
};

const stopCountdown = () => {
  clearInterval(countInterval);
  Notiflix.Notify.success('Countdown completed!');
  stopButton.setAttribute('hidden', true);
};

const startBtn = () => {
  countInterval = setInterval(startCountdown, 1000);
  startButton.disabled = true;
};

const StopBtn = () => {
  clearInterval(countInterval);
  startButton.removeAttribute('hidden');
  resetButton.removeAttribute('hidden');
  startButton.disabled = false;
  stopButton.setAttribute('hidden', false);
};

const resetBtn = () => {
  location.reload();
  selectedDate = new Date(datetimePicker.value).getTime();
};

flatpickr(datetimePicker, options);

startButton.addEventListener('click', startBtn);

stopButton.addEventListener('click', StopBtn);

resetButton.addEventListener('click', resetBtn);
