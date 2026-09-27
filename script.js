document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. SOMBRA E ESTILO NO HEADER AO ROLAR A PÁGINA
     ========================================================================== */
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 20px rgba(230, 36, 41, 0.3)';
      header.style.backgroundColor = 'rgba(10, 10, 12, 0.98)';
    } else {
      header.style.boxShadow = 'none';
      header.style.backgroundColor = 'rgba(15, 15, 18, 0.95)';
    }
  });


  /* ==========================================================================
     2. DESTAQUE NO MENU AO ROLAR (SCROLLSPY)
     ========================================================================== */
  const sections = document.querySelectorAll('main > section');
  const navLinks = document.querySelectorAll('header nav ul li a');

  const highlightNavOnScroll = () => {
    let scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
            link.style.color = '#e62429'; // Vermelho Marvel
          } else {
            link.style.color = '';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll);


  /* ==========================================================================
     3. ANIMAÇÃO DE REVELAÇÃO DE ELEMENTOS AO ROLAR (INTERSECTION OBSERVER)
     ========================================================================== */
  const cards = document.querySelectorAll('article, #fases > div, #artefatos dd');

  // Configura estado inicial dos elementos via JS (ocultos com offset)
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  });

  const observerOptions = {
    root: null,
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target); // Anima apenas uma vez
      }
    });
  }, observerOptions);

  cards.forEach(card => revealObserver.observe(card));


  /* ==========================================================================
     4. DESTAQUE DE HOVER INTERATIVO NOS CARDS DA FASE DO MCU
     ========================================================================== */
  const phaseCards = document.querySelectorAll('#fases > div');

  phaseCards.forEach(phase => {
    phase.addEventListener('mouseenter', () => {
      phaseCards.forEach(p => p.style.opacity = '0.5');
      phase.style.opacity = '1';
      phase.style.transform = 'scale(1.02)';
      phase.style.transition = 'all 0.3s ease';
    });

    phase.addEventListener('mouseleave', () => {
      phaseCards.forEach(p => {
        p.style.opacity = '1';
        p.style.transform = 'scale(1)';
      });
    });
  });

});