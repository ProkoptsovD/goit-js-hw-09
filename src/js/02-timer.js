// кастомный класс Timer
import Timer from './Timer';
import flatpickr from 'flatpickr';
import { flatpickrOptions } from './flatpickr-options';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const orangeTheme = require('flatpickr/dist/themes/material_blue.css');

const refs = {
  inputDatetimePicker: document.querySelector('#datetime-picker'),
  startCoundownBtn: document.querySelector('[data-start]'),
};

//делает кнопку неактивной до начала выбора времени отсчета
refs.startCoundownBtn.setAttribute('disabled', 'disabled');

const timer = new Timer();
timer.createDatetimePicker(refs.inputDatetimePicker, flatpickr, flatpickrOptions);

refs.inputDatetimePicker.addEventListener('input', onDatetimePickerInput);

function onDatetimePickerInput() {
  refs.startCoundownBtn.addEventListener('click', onStartCoundownBtnClick, { once: true });
  refs.inputDatetimePicker.addEventListener('click', onDatetimePickerInputClick, { once: true });

  onDatetimeSet();
}

function onStartCoundownBtnClick() {
  timer.startCoundown();
}

function onDatetimePickerInputClick() {
  clearInterval(timer.intervalId);
}

function onDatetimeSet() {
  if (!timer.isDatetimeSet()) {
    timer.onWrongDatetimePicked(refs.startCoundownBtn);
    Notify.failure('Please, pick up a date in the future');
    return;
  }

  timer.onCorectDatetimePicked(refs.startCoundownBtn);
  Notify.success("All's good! You may start the countdown");
}
