// contact.js

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

    if (submitBtn) {
      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;
    }

    if (formSuccess) formSuccess.style.display = 'none';
    if (formError) formError.style.display = 'none';

    const formData = new FormData(form);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        if (formSuccess) formSuccess.style.display = 'block';
        form.reset();
      } else {
        if (formError) formError.style.display = 'block';
      }
    } catch (error) {
      console.error('Error:', error);
      if (formError) formError.style.display = 'block';
    } finally {
      if (submitBtn) {
        submitBtn.innerHTML = originalBtnText || 'Send Inquiry →';
        submitBtn.disabled = false;
      }
    }
  });
});