(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      if (!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }

      // Show loading, hide messages
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData(thisForm);

      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json' // Formspree expects JSON response
        }
      })
        .then(response => response.json())
        .then(data => {
          thisForm.querySelector('.loading').classList.remove('d-block');
          if (data.ok) {
            thisForm.querySelector('.sent-message').classList.add('d-block');
            thisForm.reset();
          } else {
            let errorMessage = data.errors ? data.errors.map(err => err.message).join(", ") : "Form submission failed!";
            displayError(thisForm, errorMessage);
          }
        })
        .catch(error => {
          thisForm.querySelector('.loading').classList.remove('d-block');
          displayError(thisForm, error);
        });
    });
  });

  function displayError(thisForm, error) {
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
