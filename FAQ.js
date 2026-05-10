/* =============================================
   NEXAGEHANZO — script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* --------------------------------------------------
     1) 요소 선택
  -------------------------------------------------- */
  const header     = document.querySelector('.site-header');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');


  /* --------------------------------------------------
     2) 스크롤 시 헤더 .scrolled 클래스 토글
        → 배경 더 불투명 + 그림자 적용
  -------------------------------------------------- */
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }


  /* --------------------------------------------------
     3) 모바일 햄버거 메뉴 토글
  -------------------------------------------------- */
  if (hamburger && mobileMenu) {

    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    /* 모바일 메뉴 링크 클릭 시 자동 닫기 */
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-label', 'Open menu');
      });
    });

    /* 메뉴 바깥 클릭 시 자동 닫기 */
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-label', 'Open menu');
      }
    });
  }


  /* --------------------------------------------------
     4) 현재 페이지 네비 링크에 .nav-active 표시
  -------------------------------------------------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (link) {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('nav-active');
    }
  });


  /* --------------------------------------------------
     5) 뉴스레터 폼 제출 처리
  -------------------------------------------------- */
  const newsletterBtn   = document.querySelector('.newsletter-btn');
  const newsletterInput = document.querySelector('.newsletter-input');

  if (newsletterBtn && newsletterInput) {
    newsletterBtn.addEventListener('click', function () {
      const email = newsletterInput.value.trim();

      if (!email || !email.includes('@')) {
        newsletterInput.style.borderColor = 'rgba(199, 96, 96, 0.6)';
        newsletterInput.placeholder = 'Please enter a valid email';
        return;
      }

      /* 성공 처리 */
      newsletterInput.value = '';
      newsletterInput.placeholder = 'Thank you for subscribing!';
      newsletterInput.style.borderColor = 'rgba(199, 163, 96, 0.45)';
      newsletterBtn.textContent = '✓';
      newsletterBtn.style.background = '#4a7c3f';

      /* 3초 후 원래 상태로 복원 */
      setTimeout(function () {
        newsletterInput.placeholder = 'Your email';
        newsletterBtn.textContent = '→';
        newsletterBtn.style.background = '';
      }, 3000);
    });

    /* 입력 시 에러 스타일 초기화 */
    newsletterInput.addEventListener('input', function () {
      newsletterInput.style.borderColor = '';
    });

    /* Enter 키로도 제출 가능 */
    newsletterInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') newsletterBtn.click();
    });
  }


  /* --------------------------------------------------
     6) 카드 스크롤 애니메이션 (Intersection Observer)
        → 화면에 들어올 때 부드럽게 나타남
  -------------------------------------------------- */
  const animTargets = document.querySelectorAll(
    '.why-card, .herb-card, .review-card, .story-value-card'
  );

  if (animTargets.length > 0 && 'IntersectionObserver' in window) {

    animTargets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animTargets.forEach(function (el) { observer.observe(el); });
  }


  /* --------------------------------------------------
     7) 제품 썸네일 클릭 → 메인 이미지 교체 + active 표시
  -------------------------------------------------- */
  const thumbItems = document.querySelectorAll('.product-thumb-item');
  const mainImgWrap = document.querySelector('.product-main-img');

  if (thumbItems.length > 0 && mainImgWrap) {
    thumbItems.forEach(function (thumb, index) {
      thumb.addEventListener('click', function () {

        /* active 클래스 이동 */
        thumbItems.forEach(function (t) { t.classList.remove('active'); });
        thumb.classList.add('active');

        /* 실제 이미지가 있을 경우 메인 이미지 교체 */
        const thumbImg = thumb.querySelector('img');
        const mainImg  = mainImgWrap.querySelector('img');

        if (thumbImg && mainImg) {
          mainImg.src = thumbImg.src;
          mainImg.alt = thumbImg.alt;
        }
      });
    });
  }

});