document.addEventListener("DOMContentLoaded", () => {
  const systems = [
    {
      title: "Road Transport",
      desc: "Efficient road transport solution ensuring reliable deliveries across the country. Track progress in real time with optimized routes. Seamless tiep operations that integrate with multiple transport channels, making logistics smarter and faster.",
      video: "./assets/sample.mp4",
    },
    {
      title: "Shipping Service",
      desc: "Global shipping solution to move your goods by sea with complete visibility, reliability, and efficiency. Seamless tiep operations that integrate with multiple transport channels, making logistics smarter and faster.",
      video: "./assets/sample2.mp4",
    },
    {
      title: "Warehouse Management",
      desc: "Seamless warehouse management operations that integrate with multiple transport channels, making logistics smarter and faster. <br> Seamless warehouse management operations that integrate with multiple transport channels, making logistics smarter and faster.",
      video: "./assets/sample3.mp4",
    },
    {
      title: "HR System",
      desc: "Seamless HR operations that integrate with multiple business channels, making management smarter and faster. <br> Seamless HR operations that integrate with multiple business channels, making management smarter and faster.",
      video: "./assets/sample3.mp4",
    },
  ];

  let index = 0;
  const titleEl = document.getElementById("system-title");
  const descEl = document.getElementById("system-desc");
  const videoEl = document.getElementById("system-video");

  const contentEl = document.querySelector(".transport-content");
  const videoWrapper = document.querySelector(".transport-video");

  function updateSystem() {
    contentEl.classList.remove("active");
    videoWrapper.classList.remove("active");

    setTimeout(() => {
      const system = systems[index];
      titleEl.textContent = system.title;
      descEl.innerHTML = system.desc; // allow <br>
      videoEl.src = system.video;
      videoEl.play();

      // Re-add active for fade-in
      contentEl.classList.add("active");
      videoWrapper.classList.add("active");

      index = (index + 1) % systems.length;
    }, 400); // wait for fade-out before updating
  }

  // First load
  updateSystem();

  // change every 4s
  setInterval(updateSystem, 4000);
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

