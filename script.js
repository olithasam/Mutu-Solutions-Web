// Animate Six Solutions on scroll
window.addEventListener('scroll', () => {
  const solutions = document.querySelectorAll('.solution');
  const trigger = window.innerHeight * 0.8;

  solutions.forEach(sol => {
    const top = sol.getBoundingClientRect().top;
    if (top < trigger) {
      sol.classList.add('show');
    }
  });
});
