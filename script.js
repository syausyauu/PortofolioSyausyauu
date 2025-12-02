/*************************************
 * SMOOTH SCROLL NAVIGATION (FIXED)
 *************************************/
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');

    // Hanya smooth scroll untuk anchor (#)
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  });
});

/*************************************
 * PROJECT POPUP
 *************************************/
const projectCards = document.querySelectorAll(".project-card");

const popup = document.createElement("div");
popup.classList.add("project-detail");
popup.innerHTML = `
  <span class="close-btn">&times;</span>
  <div class="detail-content">
    <h2 id="popup-title"></h2>
    <p id="popup-desc"></p>
    <div class="pdf-wrapper" id="popup-pdf"></div>
    <a id="popup-link" href="#" target="_blank">View on GitHub</a><br>
    <a id="popup-figma" href="#" target="_blank">View Figma</a><br>
    <a id="popup-website" href="#" target="_blank">Visit Website</a>
  </div>
`;
document.body.appendChild(popup);

// Ketika project card diklik
projectCards.forEach(card => {
  card.addEventListener("click", () => {
    const title = card.dataset.title;
    const desc = card.dataset.desc;
    const pdf = card.dataset.pdf;
    const github = card.dataset.github;
    const figma = card.dataset.figma;
    const website = card.dataset.website;

    document.getElementById("popup-title").innerText = title;
    document.getElementById("popup-desc").innerText = desc;

    // PDF embed
    if (pdf) {
      document.getElementById("popup-pdf").innerHTML =
        `<iframe src="${pdf}" width="100%" height="600px"></iframe>`;
    } else {
      document.getElementById("popup-pdf").innerHTML = "";
    }

    document.getElementById("popup-link").href = github || "#";
    document.getElementById("popup-figma").href = figma || "#";
    document.getElementById("popup-website").href = website || "#";

    popup.classList.add("show");
    document.body.style.overflow = "hidden";
  });
});

// Tutup popup
popup.querySelector(".close-btn").addEventListener("click", () => {
  popup.classList.remove("show");
  document.body.style.overflow = "auto";
});

/*************************************
 * CONTACT FORM BUBBLE ANIMATION
 *************************************/
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = new FormData(contactForm);
    const response = await fetch(contactForm.action, {
      method: contactForm.method,
      body: data,
      headers: { "Accept": "application/json" }
    });

    if (response.ok) {
      const bubble = document.createElement("div");
      bubble.classList.add("sent-bubble");
      bubble.textContent = "💌 Message Sent Successfully!";
      document.body.appendChild(bubble);

      setTimeout(() => bubble.remove(), 3000);
      contactForm.reset();
    } else {
      alert("❌ Oops! Something went wrong. Try again later.");
    }
  });
}

/*************************************
 * SCROLL ZOOM BACKGROUND EFFECT
 *************************************/
window.addEventListener("scroll", function() {
  if (window.scrollY > 50) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
});

/*************************************
 * CERTIFICATION CYLINDER
 *************************************/
const cylinder = document.getElementById("cylinder");
const images = document.querySelectorAll(".cylinder img");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (cylinder && images.length > 0) {
  let currentIndex = 0;
  const totalImages = images.length;
  const rotationStep = 360 / totalImages;

  function updateRotation() {
    const rotation = currentIndex * rotationStep;
    cylinder.style.transform = `rotateY(${rotation}deg)`;
  }

  nextBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalImages;
    updateRotation();
  });

  prevBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateRotation();
  });

  /***** Scroll-based Rotation *****/
  let targetRotation = 0;
  let currentRotation = 0;
  const step = 0.08;

  function animate() {
    currentRotation += (targetRotation - currentRotation) * step;
    cylinder.style.transform = `rotateY(${currentRotation}deg)`;
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(scrollY / maxScroll, 1);
    const index = Math.round(scrollPercent * (totalImages - 1));
    targetRotation = index * rotationStep;
  });
}
