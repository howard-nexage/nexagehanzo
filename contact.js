// contact.js

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby8UHhnFVj0mpq94Ktt2YpaI9nFgV3rbxHhR5n6MB6XOF15sFRakBjHLwiFPLFyhVcXSQ/exec';

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Update button state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;

      const formData = new FormData(form);

      fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData
      })
      .then(response => {
        form.style.display = 'none';
        if (formSuccess) formSuccess.style.display = 'block';
        if (formError) formError.style.display = 'none';
      })
      .catch(error => {
        console.error('Error!', error.message);
        if (formError) formError.style.display = 'block';
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      });
    });
  }
});
