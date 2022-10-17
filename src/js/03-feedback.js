import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

let formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));
getDataBase();

function onFormInput(e) {
  const { name, value } = e.target;
  formData[name] = value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  if (refs.textarea.value === '' || refs.input.value === '') {
    alert('Please make sure all fields are filled in correctly');
  } else {
    e.currentTarget.reset();
    localStorage.removeItem('feedback-form-state');
    console.log(formData);
  }
}

function getDataBase() {
  const getData = localStorage.getItem('feedback-form-state');
  const parsedData = JSON.parse(getData);
  if (getData) {
    formData = parsedData;
    for (let key in formData) {
      refs.form.elements[key].value = formData[key];
    }
  }
}
