// библиотка notify
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmitCreatePomises);

//=========================functions==============================//
function onFormSubmitCreatePomises(e) {
  e.preventDefault();

  const delay = Number(e.target.delay.value);
  const step = Number(e.target.step.value);
  const amount = Number(e.target.amount.value);

  let delayStep = delay;

  for (let i = 1; i <= amount; i += 1) {
    delayStep += step;

    createPromise(i, delayStep)
      .then(result => Notify.success(result, { useIcon: false, fontSize: '1rem' }))
      .catch(result => Notify.failure(result, { useIcon: false, fontSize: '1rem' }));
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        res(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        rej(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
