document.addEventListener("DOMContentLoaded", () => {
  const systems = [
   
    {
      title: "Shipping",
      desc: "Global shipping solution to move your goods by sea with complete visibility, reliability, and efficiency.Seamless tiep operations that integrate with multiple transport channels, making logistics smarter and faster. Seamless tiep operations that integrate with multiple transport channels, making logistics smarter and faster.",
      video: "./assets/sample2.mp4",
    },
    {
      title: "Tiep",
      desc: "Seamless tiep operations that integrate with multiple transport channels, making logistics smarter and faster.Seamless tiep operations that integrate with multiple transport channels, making logistics smarter and faster. <br>Seamless tiep operations that integrate with multiple transport channels, making logistics smarter and faster.",
      video: "./assets/sample3.mp4",
    },
  ];

  let index = 0;
  const titleEl = document.getElementById("system-title");
  const descEl = document.getElementById("system-desc");
  const videoEl = document.getElementById("system-video");

  function updateSystem() {
    const system = systems[index];
    titleEl.textContent = system.title;
    descEl.textContent = system.desc;
    videoEl.src = system.video;
    videoEl.play();

    // move to next
    index = (index + 1) % systems.length;
  }

  // change every 4 seconds
  setInterval(updateSystem, 3000);
});

// Reveal fade-in elements on scroll
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.2, // trigger when 20% visible
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // animate once
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});

