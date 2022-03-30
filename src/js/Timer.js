// библиотка flatpickr
import flatpickr from 'flatpickr';
import { flatpickrOptions } from './options';
import 'flatpickr/dist/flatpickr.min.css';

// библиотка notify
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notifyOptions } from './options';

export default class Timer {
  static refs = {
    dateTimePicker: document.querySelector('#datetime-picker'),
    startCountdownBtn: document.querySelector('[data-start]'),
    clockFaceUiElements: document.querySelectorAll('.value'),
  };
  static convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  #days;
  #hours;
  #minutes;
  #seconds;
  #intervalId;
  #pickedTime;

  constructor() {
    this.dateTimePicker = null;
    this.#days = null;
    this.#hours = null;
    this.#minutes = null;
    this.#seconds = null;
    this.#intervalId = null;
    this.#pickedTime = null;

    this.initialize();
  }

  initialize() {
    this.dateTimePicker = flatpickr(Timer.refs.dateTimePicker, flatpickrOptions);
    Timer.refs.dateTimePicker.addEventListener('input', () => {
      this.onDatetimePickerInput();
    });
  }

  onDatetimePickerInput() {
    Timer.refs.dateTimePicker.addEventListener(
      'click',
      () => {
        console.log('here');
        this.stopCountdown();
      },
      { once: true },
    );
    Timer.refs.startCountdownBtn.addEventListener(
      'click',
      () => {
        this.startCountdown();
      },
      { once: true },
    );

    this.onDatetimeSet();
  }

  stopCountdown() {
    clearInterval(this.intervalId);
  }

  onDatetimeSet() {
    if (!this.isDatetimeSet()) {
      this.onWrongDatetimePicked();
      Notify.failure('Please, pick up a date in the future', notifyOptions);
      return;
    }

    this.onCorectDatetimePicked();
    Notify.success("All's good! You may start the countdown", notifyOptions);
  }

  get pickedTime() {
    return this.#pickedTime;
  }

  set pickedTime(newTime) {
    this.#pickedTime = newTime;
  }

  get intervalId() {
    return this.#intervalId;
  }

  set intervalId(newId) {
    this.#intervalId = newId;
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      const { days, hours, minutes, seconds } = Timer.convertMs(
        this.#pickedTime - Date.parse(new Date()),
      );

      this.#days = days.toString();
      this.#hours = hours.toString();
      this.#minutes = minutes.toString();
      this.#seconds = seconds.toString();

      this.updateClockFaceUI();
    }, 1000);
  }

  updateClockFaceUI() {
    Timer.refs.clockFaceUiElements.forEach(element => {
      const datetimeName = Object.keys(element.dataset).join``;

      switch (datetimeName) {
        case 'days':
          this.setClockFaceUI(element, this.#days);
          break;
        case 'hours':
          this.setClockFaceUI(element, this.#hours);
          break;
        case 'minutes':
          this.setClockFaceUI(element, this.#minutes);
          break;
        case 'seconds':
          this.setClockFaceUI(element, this.#seconds);
          break;
      }
    });
  }

  setClockFaceUI(elem, value) {
    elem.textContent = this.addLeadingZero(value);
  }

  addLeadingZero(value) {
    return value.padStart(2, '0');
  }

  onWrongDatetimePicked() {
    this.#pickedTime = null;
    Timer.refs.startCountdownBtn.setAttribute('disabled', 'disabled');
  }

  onCorectDatetimePicked() {
    Timer.refs.startCountdownBtn.removeAttribute('disabled');
  }

  isDatetimeSet() {
    const currentDate = Date.parse(new Date());
    const timeToSet = Date.parse(this.dateTimePicker.selectedDates[0]);
    const timeDifference = timeToSet - currentDate;

    if (this.isDateValid(timeDifference)) {
      this.#pickedTime = null;
      return false;
    }

    this.#pickedTime = timeToSet;
    return true;
  }

  isDateValid(dateTimeToValidate) {
    return dateTimeToValidate < 0;
  }
}
