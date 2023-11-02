function dateInputs() {
  // Получаем все элементы с атрибутом data-date-input
  const dateInputs = document.querySelectorAll('[data-mask-input]');

  if (!dateInputs) {
    return null
  }

  // Проходимся по каждому элементу и создаем для него экземпляр IMask
  dateInputs.forEach(dateInput => {
    IMask(dateInput, {
      mask: "+{7} (000) 000 - 00 - 00",
    });
  });

}
dateInputs();

// validate////////////////////////////////////////////////////////////////////////////////////////////////////////

let forms = document.querySelectorAll('.authorization__form');

forms.forEach(form => {
  let formInputs = form.querySelectorAll('[data-js-input]');
  let inputPhone = form.querySelector('[data-js-input-phone]');

  formInputs.forEach(input => {
    input.addEventListener('input', function () {
      const inputValue = input.value.trim();

      if (inputValue !== '') {
        input.classList.remove('error');
        form.classList.remove('error');
      }
    });
  });

  function validatePhone(phone) {
    // Удаляем все нечисловые символы из номера телефона
    const cleanedPhone = phone.replace(/[^0-9]/g, "");

    // Проверяем номер телефона
    let re = /^7\d{10}$/; // Формат: 7XXXXXXXXXX (11 цифр без пробелов)
    return re.test(cleanedPhone);
  }

  if (inputPhone) {
    inputPhone.addEventListener('input', function () {
      const phoneVal = inputPhone.value;

      // Удаляем все нечисловые символы из номера телефона
      const cleanedPhone = phoneVal.replace(/[^0-9]/g, "");

      if (validatePhone(cleanedPhone)) {
        inputPhone.classList.remove('error');
        form.classList.remove('error');
      }
    });
  }

  form.onsubmit = function () {
    let phoneVal = inputPhone ? inputPhone.value : '';
    let emptyInputs = Array.from(formInputs).filter(input => input.value === '');

    emptyInputs.forEach(function (input) {
      if (input.value.trim() === '') {
        input.classList.add('error');
        form.classList.add('error');
        console.log('input not filled');
      } else {
        input.classList.remove('error');
        form.classList.remove('error');
      }
    })

    if (emptyInputs.length !== 0) {
      console.log('inputs not filled');
      return false;
    }

    if (inputPhone && !validatePhone(phoneVal)) {
      console.log('phone not valid');
      inputPhone.classList.add('error');
      form.classList.add('error');
      return false;
    } else if (inputPhone) {
      inputPhone.classList.remove('error');
      form.classList.remove('error');
    }

    // Добавьте код для отправки формы, если все данные введены верно
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const openModalBtns = document.querySelectorAll('.open-modal-btn');
const closeModalBtns = document.querySelectorAll('.close-modal-btn');
const modals = document.querySelectorAll('.modal');

openModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.dataset.modalId;
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
  });
});

closeModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    modal.classList.remove('show');
  });
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.classList.remove('show');
  }
});
