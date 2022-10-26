const CHANGE_COLOR_DELAY = 1000;

const refs = {
  startButtonRef: document.querySelector('button[data-start]'),
  stopButtonRef: document.querySelector('button[data-stop]'),
  bodyRef: document.querySelector('body'),
};

let timerId = null;
refs.stopButtonRef.disabled = true;

refs.startButtonRef.addEventListener('click', onStartClick);
refs.stopButtonRef.addEventListener('click', onStopClick);

function onStartClick(ev) {
  refs.startButtonRef.disabled = true;
  refs.stopButtonRef.disabled = false;
  timerId = setInterval(() => {
    refs.bodyRef.style.backgroundColor = getRandomHexColor();
  }, CHANGE_COLOR_DELAY);
}

function onStopClick(ev) {
  refs.startButtonRef.disabled = false;
  refs.stopButtonRef.disabled = true;
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
