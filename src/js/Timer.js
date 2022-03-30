export default class Timer {
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
    this.#days = null;
    this.#hours = null;
    this.#minutes = null;
    this.#seconds = null;
    this.dateTimePicker = null;
    this.#intervalId = null;
    this.#pickedTime = null;
  }

  createDatetimePicker(element, callback, options = {}) {
    this.dateTimePicker = callback(element, options);
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

  startCoundown() {
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
    const clockFaceUiElements = document.querySelectorAll('.value');

    clockFaceUiElements.forEach(element => {
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

  onWrongDatetimePicked(elem) {
    this.#pickedTime = null;
    elem.setAttribute('disabled', 'disabled');
  }

  onCorectDatetimePicked(elem) {
    elem.removeAttribute('disabled');
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
