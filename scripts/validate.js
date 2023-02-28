const enableFormValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
  };

  

  function validationConfig(form, config) {
    form.addEventListener('input', () => {
        toggleButton(form, config);
    });
    addInpitListener(form, config);
    toggleButton(form, config);
}


function enableValidation(config) { 
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((form) => {
        validationConfig(form, config)
  });
};


function handleFormInput(evt, config) {
    const input = evt.target;
    const inputId = input.id;
    const errorElement = document.querySelector(`#${inputId}-error`);

    if (input.validity.valid) {
        input.classList.remove(config.inputErrorClass);
        errorElement.textContent = '';
    } else {
        input.classList.add(config.inputErrorClass);
        errorElement.textContent = input.validationMessage;
    }
}


function toggleButton(form, config) {
    const buttonSubmit = form.querySelector(config.submitButtonSelector);
    const ifFormValid = form.checkValidity();

    buttonSubmit.disabled = !ifFormValid;
    buttonSubmit.classList.toggle(config.inactiveButtonClass, !ifFormValid);
}


function addInpitListener(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));

    inputList.forEach((item) => {
        item.addEventListener('input', (evt) => {
            handleFormInput(evt, config);
        });
    });
}


enableValidation(enableFormValidation);