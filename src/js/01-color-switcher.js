let interval;
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
stopButton.disabled = true;

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};

const changeBackgroundColor = () =>
  (document.body.style.backgroundColor = getRandomHexColor());

const actionInterval = () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  changeBackgroundColor();
  interval = setInterval(changeBackgroundColor, 500);
};

const stopInterval = () => {
  startButton.disabled = false;
  stopButton.disabled = true;

  clearInterval(interval);
};

startButton.addEventListener('click', actionInterval);
stopButton.addEventListener('click', stopInterval);
