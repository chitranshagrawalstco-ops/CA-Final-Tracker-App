function openRazorpayCheckout() {
  const options = {
    key: "rzp_test_ReplaceWithYourKey", // Replace with your Razorpay Key ID
    amount: 499900, // Amount in paise = Rs 4,999.00
    currency: "INR",
    name: "CA Next Door",
    description: "CA Next Door Study Tracker Purchase",
    image: "https://cdn.razorpay.com/logos/GhRQcyean79PqE_medium.png",
    handler: function (response) {
      alert("Payment successful. Payment ID: " + response.razorpay_payment_id);
    },
    prefill: {
      name: "",
      email: "",
      contact: ""
    },
    notes: {
      product: "CA Next Door Study Tracker"
    },
    theme: {
      color: "#2563eb"
    }
  };

  const rzp = new Razorpay(options);

  rzp.on("payment.failed", function (response) {
    alert("Payment failed: " + response.error.description);
  });

  rzp.open();
}

["buyNowTop", "buyNowHero", "buyNowBottom"].forEach((id) => {
  const button = document.getElementById(id);
  if (button) {
    button.addEventListener("click", openRazorpayCheckout);
  }
});

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
