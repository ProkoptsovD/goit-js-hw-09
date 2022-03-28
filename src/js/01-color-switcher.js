const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  intervalId: null,
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

//для CSS-стилей
document.body.classList.add('switcher');
refs.stopBtn.setAttribute('disabled', 'disabled');

//обрабатывает событие "клик" на кнопке startBtn
function onStartBtnClick() {
  refs.intervalId = setInterval(changeBodyBgColor, 1000);
  toggleAttribute('disabled');
}

//обрабатывает событие "клик" на кнопке startBtn
function onStopBtnClick() {
  clearInterval(refs.intervalId);
  toggleAttribute('disabled');
}

//изменяет фоновый цвет body
function changeBodyBgColor() {
  const bodyRef = document.querySelector('body');
  bodyRef.style.backgroundColor = getRandomHexColor();
}

//выполняет toggle атрубута disabled у кнопок startBtn и stopBtn
function toggleAttribute(attribute) {
  refs.startBtn.toggleAttribute(attribute);
  refs.stopBtn.toggleAttribute(attribute);
}

//генерация случайного цвета
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
