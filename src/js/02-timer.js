import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const orangeTheme = require('flatpickr/dist/themes/material_blue.css');

// кастомный класс Timer
import Timer from './Timer';

//объект настроек для библиотеки flatpickr
import { flatpickrOptions } from './flatpickr-options';

const refs = {
  inputDatetimePicker: document.querySelector('#datetime-picker'),
  startCoundownBtn: document.querySelector('[data-start]'),
};

//делает кнопку неактивной до начала выбора времени отсчета
refs.startCoundownBtn.setAttribute('disabled', 'disabled');

// создает таймер и создает поле выбора даты для библиотеки flatpickr
const timer = new Timer();
timer.createDatetimePicker(refs.inputDatetimePicker, flatpickr, flatpickrOptions);

// узнаем выбранное время
refs.inputDatetimePicker.addEventListener('input', e => {
  refs.startCoundownBtn.addEventListener(
    'click',
    () => {
      timer.startCoundown();
    },
    { once: true },
  );
  const selectedDatetime = Date.parse(timer.flatpickr.selectedDates[0]);

  if (!timer.isDatetimeValid(selectedDatetime)) {
    timer.onWrongDatetimePicked(refs.startCoundownBtn);
    alert('wrong datetime');
    return;
  }

  timer.onCorectDatetimePicked(refs.startCoundownBtn, selectedDatetime);
});

// onStartCountdownBtnClick() {

// }
