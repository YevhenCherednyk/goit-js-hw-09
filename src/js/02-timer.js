import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const TIME_DELAY = 1000;
let intervalId = null;
let endTime = null;

const refs = {
  inputRef: document.querySelector('#datetime-picker'),
  startBtnRef: document.querySelector('button[data-start]'),
  daysRef: document.querySelector('span[data-days]'),
  hoursRef: document.querySelector('span[data-hours]'),
  minsRef: document.querySelector('span[data-minutes]'),
  secsRef: document.querySelector('span[data-seconds]'),
};

refs.startBtnRef.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      //   window.alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');

      refs.startBtnRef.setAttribute('disabled', true);
    }
    refs.startBtnRef.removeAttribute('disabled');
  },
};

const calendar = flatpickr(refs.inputRef, options);

refs.startBtnRef.addEventListener('click', onStartBtnClick);

function onStartBtnClick(evt) {
  refs.startBtnRef.setAttribute('disabled', true);
  refs.inputRef.setAttribute('disabled', true);

  Notiflix.Notify.success('Start of countdown');

  intervalId = setInterval(timeCounter, TIME_DELAY);
}

function timeCounter(evt) {
  const deltaTime = calendar.selectedDates[0] - new Date();

  if (deltaTime <= 0) {
    clearInterval(intervalId);
    Notiflix.Notify.success('End of countdown');
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(deltaTime);

  refs.daysRef.textContent = addLeadingZero(days);
  refs.hoursRef.textContent = addLeadingZero(hours);
  refs.minsRef.textContent = addLeadingZero(minutes);
  refs.secsRef.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}