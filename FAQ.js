document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.faq-question').forEach(function (button) {
    button.addEventListener('click', function () {
      const item = button.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = button.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(function (openButton) {
        openButton.setAttribute('aria-expanded', 'false');
        openButton.closest('.faq-item').querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        button.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
});
