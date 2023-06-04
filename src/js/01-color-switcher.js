let intervalId; // Variable parael intervalo de tiempo
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
stopButton.disabled = true; // Ocultamos el boton stop

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};

// Funcion para obtener un fondo aleatorio
const changeBackgroungColor = () =>
  (document.body.style.backgroundColor = getRandomHexColor());

//Funcion para iniciar la ejecucion del intervalo
const onInterval = () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  changeBackgroungColor(); // hacemos el primer cambio de fondo
  // Metodo interval para repeteir el codigo cada segundo
  intervalId = setInterval(changeBackgroungColor, 1000);
};

//Funcion para detener la ejecucion  del intervalo
const clsInterval = () => {
  startButton.disabled = false;
  stopButton.disabled = true;
  // Metodo para detener el intervalo de tiempo de start
  clearInterval(intervalId);
};

// Leemos los eventos en los botones
startButton.addEventListener('click', onInterval);
stopButton.addEventListener('click', clsInterval);
