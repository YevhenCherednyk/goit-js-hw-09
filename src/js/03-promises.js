import Notiflix from 'notiflix';

const refs = {
  formRef: document.querySelector('.form'),
};

refs.formRef.addEventListener('submit', onBtnClick);

function onBtnClick(evt) {
  evt.preventDefault();

  let firstDelay = Number(refs.formRef.delay.value);
  const delayStep = Number(refs.formRef.step.value);
  const promisesAmount = Number(refs.formRef.amount.value);

  for (let i = 1; i <= promisesAmount; i += 1) {
    createPromise(i, firstDelay);
    firstDelay += delayStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(value => {
      console.log(value);
      Notiflix.Notify.success(value);
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(error);
    });
}
