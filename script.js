const googleFormUrl = "https://forms.gle/dYdoFBPXWjQThG4YA";
const fallbackQrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=Payment%20QR";
const paymentDoneBtn = document.getElementById("paymentDoneBtn");
const paymentQr = document.getElementById("paymentQr");

["buyNowTop", "buyNowHero", "buyNowBottom"].forEach((id) => {
  const button = document.getElementById(id);
  if (button) {
    button.addEventListener("click", () => {
      window.location.href = "payment.html";
    });
  }
});

if (paymentDoneBtn) {
  paymentDoneBtn.addEventListener("click", () => {
    window.open(googleFormUrl, "_blank", "noopener,noreferrer");
  });
}

if (paymentQr) {
  paymentQr.addEventListener("error", () => {
    paymentQr.src = fallbackQrUrl;
  });
}

const revealItems = document.querySelectorAll(".reveal");

revealItems.forEach((item, idx) => {
  item.style.transitionDelay = `${Math.min(idx * 60, 380)}ms`;
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

const carousel = document.getElementById("featureCarousel");

if (carousel) {
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const title = document.getElementById("carouselTitle");
  const dotsWrap = document.getElementById("carouselDots");
  let current = 0;
  let timer;

  const dots = slides.map((_, idx) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to screenshot ${idx + 1}`);
    dot.addEventListener("click", () => {
      goTo(idx);
      restart();
    });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function render() {
    slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === current);
    });
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === current);
    });
    if (title) {
      title.textContent = slides[current].dataset.title || `Screenshot ${current + 1}`;
    }
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    render();
  }

  function next() {
    goTo(current + 1);
  }

  function start() {
    timer = setInterval(next, 2300);
  }

  function restart() {
    clearInterval(timer);
    start();
  }

  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  carousel.addEventListener("mouseleave", start);

  render();
  start();
}
