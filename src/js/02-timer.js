import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init();

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const resetButton = document.querySelector('[data-reset]');

const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

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
