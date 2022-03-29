export default class Timer {
  #days;
  #hours;
  #minutes;
  #seconds;
  #choosenDate;
  #intervalId;

  constructor() {
    this.#days = null;
    this.#hours = null;
    this.#minutes = null;
    this.#seconds = null;
    this.#choosenDate = null;
    this.#intervalId = null;
    this.flatpickr = null;
  }

  createDatetimePicker(element, callback, options = {}) {
    const dateTimePicker = callback(element, options);
    this.flatpickr = dateTimePicker;
  }

  get days() {
    return this.#days;
  }
  set days(newDay) {
    this.#days = newDay;
  }

  get hours() {
    return this.#hours;
  }
  set hours(newHours) {
    this.#hours = newHours;
  }

  get minutes() {
    return this.#minutes;
  }
  set minutes(newMinutes) {
    this.#minutes = newMinutes;
  }

  get seconds() {
    return this.#seconds;
  }
  set seconds(newSeconds) {
    this.#seconds = newSeconds;
  }

  get choosenDate() {
    return this.#choosenDate;
  }

  set choosenDate(newDateTime) {
    this.#choosenDate = newDateTime;
  }

  get intervalId() {
    return this.#intervalId;
  }

  set intervalId(newId) {
    this.#intervalId = newId;
  }

  startCoundown() {
    setInterval(() => {
      const { days, hours, minutes, seconds } = this.convertMs(
        this.choosenDate - Date.parse(new Date()),
      );

      this.days = days.toString();
      this.hours = hours.toString();
      this.minutes = minutes.toString();
      this.seconds = seconds.toString();

      this.updateClockFaceUI();
    }, 1000);
  }

  updateClockFaceUI() {
    const clockFaceUiElements = document.querySelectorAll('.value');

    clockFaceUiElements.forEach(element => {
      const datetimeName = Object.keys(element.dataset).join``;

      switch (datetimeName) {
        case 'days':
          this.setClockFaceUI(element, this.days);
          break;
        case 'hours':
          this.setClockFaceUI(element, this.hours);
          break;
        case 'minutes':
          this.setClockFaceUI(element, this.minutes);
          break;
        case 'seconds':
          this.setClockFaceUI(element, this.seconds);
          break;
      }
    });
  }

  setClockFaceUI(elem, value) {
    elem.textContent = value.padStart(2, '0');
  }

  isDatetimeValid(selectedDatetime) {
    return Number(Date.parse(new Date())) - Number(selectedDatetime) < 0;
  }

  onWrongDatetimePicked(elem) {
    this.choosenDate = null;
    elem.setAttribute('disabled', 'disabled');
  }

  onCorectDatetimePicked(elem, selectedDatetime) {
    this.choosenDate = selectedDatetime;
    elem.removeAttribute('disabled');
  }

  convertMs(ms) {
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
}
