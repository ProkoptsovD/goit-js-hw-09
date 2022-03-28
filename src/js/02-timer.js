import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const orangeTheme = require('flatpickr/dist/themes/material_blue.css');

const refs = {
  inputDatetimePicker: document.querySelector('#datetime-picker'),
  startCoundownBtn: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
};

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(refs.inputDatetimePicker, flatpickrOptions);

refs.startCoundownBtn.setAttribute('disabled', 'disabled');
