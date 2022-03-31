const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),

  intervalId: null,
};

refs.startBtn.addEventListener('click', onStartBtnClickChangeBgColor);
refs.stopBtn.addEventListener('click', onStopBtnClickStopBgColorChanging);

//для CSS-стилей
refs.body.classList.add('switcher');
refs.stopBtn.setAttribute('disabled', 'disabled');

//обрабатывает событие "клик" на кнопке startBtn
function onStartBtnClickChangeBgColor() {
  refs.intervalId = setInterval(() => {
    changeBgColor(refs.body);
  }, 1000);
  setBtnState(refs.startBtn, 'disabled');
  setBtnState(refs.stopBtn, 'enabled');
}

//обрабатывает событие "клик" на кнопке startBtn
function onStopBtnClickStopBgColorChanging() {
  clearInterval(refs.intervalId);
  setBtnState(refs.startBtn, 'enabled');
  setBtnState(refs.stopBtn, 'disabled');
}

//изменяет фоновый цвет body
function changeBgColor(element) {
  element.style.backgroundColor = getRandomHexColor();
}

//выполняет toggle атрубута disabled у кнопок startBtn и stopBtn
function setBtnState(element, attribute) {
  const ATTRIBUTE_PROPERTY = 'disabled';

  switch (attribute) {
    case 'disabled':
      element.setAttribute(ATTRIBUTE_PROPERTY, ATTRIBUTE_PROPERTY);
      break;
    case 'enabled':
      element.removeAttribute(ATTRIBUTE_PROPERTY);
      break;
  }
}

//генерация случайного цвета
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
