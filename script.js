// Menambahkan event listener agar klik pada navigasi bisa scroll dengan halus
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
  
      // Jika link dimulai dengan # → smooth scroll
      if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
  
      // Jika link adalah .html → biarkan default (pindah halaman)
    });
  });
  
  // Ambil semua card
  const projectCards = document.querySelectorAll(".project-card");
  
  // Buat elemen popup
  const popup = document.createElement("div");
  popup.classList.add("project-detail");
  popup.innerHTML = `
    <span class="close-btn">&times;</span>
    <div class="detail-content">
      <h2 id="popup-title"></h2>
      <p id="popup-desc"></p>
      <div class="pdf-wrapper" id="popup-pdf">
        <!-- PDF will be embedded here -->
      </div>
      <a id="popup-link" href="#" target="_blank">View on GitHub</a>
      <br>
      <a id="popup-figma" href="#" target="_blank">View Figma</a>
      <br>
      <a id="popup-website" href="#" target="_blank">Visit Website</a>
    </div>
  `;
  document.body.appendChild(popup);
  
  // Klik project
  projectCards.forEach(card => {
    card.addEventListener("click", () => {
      const title = card.getAttribute("data-title");
      const desc = card.getAttribute("data-desc");
      const pdf = card.getAttribute("data-pdf");
      const github = card.getAttribute("data-github");
      const figma = card.getAttribute("data-figma");
      const website = card.getAttribute("data-website");
  
      document.getElementById("popup-title").innerText = title;
      document.getElementById("popup-desc").innerText = desc;
  
      // Embed PDF in the modal
      const pdfURL = pdf;
      document.getElementById("popup-pdf").innerHTML = `<iframe src="${pdfURL}" width="100%" height="600px"></iframe>`;
  
      document.getElementById("popup-link").href = github;
      document.getElementById("popup-figma").href = figma;
      document.getElementById("popup-website").href = website;
  
      // Show the modal
      popup.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  });
  
  // Tutup popup
  popup.querySelector(".close-btn").addEventListener("click", () => {
    popup.classList.remove("show");
    document.body.style.overflow = "auto";
  });
  
  // Smooth scroll to About Me section on about.html
document.getElementById('about-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('about-me').scrollIntoView({ behavior: 'smooth' });
  });
  // Add any interactive elements you want to include
  document.addEventListener("DOMContentLoaded", function() {
    // Placeholder for any JS code if needed
  });
  // Menambahkan event listener agar klik pada navigasi bisa scroll dengan halus
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault(); // Mencegah link berjalan seperti biasa
  
      // Scroll ke elemen dengan ID yang sesuai
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth' // Scroll halus
      });
    });
  });
// Menambahkan event listener agar klik pada navigasi bisa scroll dengan halus
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
  
      // Jika link dimulai dengan # → smooth scroll
      if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
  
      // Jika link adalah .html → biarkan default (pindah halaman)
    });
  });
  
  
  // Remove the duplicate declaration
  // const cylinder = document.querySelector('.cylinder');
  const bg = document.querySelector('.background-img');
  // Remove the duplicate declaration
  // const images = document.querySelectorAll('.cylinder img');
  
  // Variabel buat efek halus
  let targetRotation = 0;
  let currentRotation = 0;
  const step = 0.08; // makin kecil = makin halus
  const rotationPerImage = 360 / images.length;
  
  // fungsi animasi terus jalan
  function animate() {
    // interpolasi lembut ke target rotasi
    currentRotation += (targetRotation - currentRotation) * step;
    cylinder.style.transform = `rotateY(${currentRotation}deg)`;
    requestAnimationFrame(animate);
  }
  animate();
  
  // handle scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(scrollY / maxScroll, 1);
  
    // hitung index gambar berdasarkan posisi scroll
    const index = Math.round(scrollPercent * (images.length - 1));
    targetRotation = index * rotationPerImage;
  
    // background zoom lembut
    const zoom = 1 + scrollPercent * 0.15;
    bg.style.transform = `scale(${zoom})`;
  });
// Menambahkan event listener agar klik pada navigasi bisa scroll dengan halus
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
  
      // Jika link dimulai dengan # → smooth scroll
      if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
  
      // Jika link adalah .html → biarkan default (pindah halaman)
    });
  });
  
  document.querySelector(".contact-form").addEventListener("submit", async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
  
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });
  
    if (response.ok) {
      // Animasi bubble naik saat pesan terkirim
      const bubble = document.createElement("div");
      bubble.classList.add("sent-bubble");
      bubble.textContent = "💌 Message Sent Successfully!";
      document.body.appendChild(bubble);
      setTimeout(() => bubble.remove(), 3000);
      form.reset();
    } else {
      alert("❌ Oops! Something went wrong. Try again later.");
    }
  });
// Scroll Zoom Effect
window.addEventListener("scroll", function() {
    if (window.scrollY > 50) {
      document.body.classList.add("scrolled");
    } else {
      document.body.classList.remove("scrolled");
    }
  });
    
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
  
      const href = this.getAttribute('href');
  
      // Jika href bukan mengarah ke file lain
      if (href.startsWith('#')) {
        e.preventDefault(); 
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
  
      // Jika href adalah .html → biarkan default (pindah halaman)
    });
  });
  
  // Use the existing variable instead of redeclaring
  // const cylinder = document.getElementById('cylinder');
  const cylinder = document.getElementById('cylinder');
const images = document.querySelectorAll('.cylinder img');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;  // To track the current image in the cylinder
const totalImages = images.length;  // Number of images in the cylinder
const rotationStep = 360 / totalImages;  // Step for each image's rotation

// Function to update the cylinder's rotation based on the current index
function updateRotation() {
  const rotation = currentIndex * rotationStep;
  cylinder.style.transform = `rotateY(${rotation}deg)`; // Apply the rotation
}

// Move to the next image (right button)
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalImages;  // Loop back to the first image if we reach the end
  updateRotation();
});

// Move to the previous image (left button)
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;  // Loop back to the last image if we reach the beginning
  updateRotation();
});














// Menambahkan event listener agar klik pada navigasi bisa scroll dengan halus
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault(); // Mencegah link berjalan seperti biasa

    // Scroll ke elemen dengan ID yang sesuai
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth' // Scroll halus
    });
  });
});
// Ambil semua card
const projectCards = document.querySelectorAll(".project-card");

// Buat elemen popup
const popup = document.createElement("div");
popup.classList.add("project-detail");
popup.innerHTML = `
  <span class="close-btn">&times;</span>
  <div class="detail-content">
    <h2 id="popup-title"></h2>
    <p id="popup-desc"></p>
    <div class="pdf-wrapper" id="popup-pdf">
      <!-- PDF will be embedded here -->
    </div>
    <a id="popup-link" href="#" target="_blank">View on GitHub</a>
    <br>
    <a id="popup-figma" href="#" target="_blank">View Figma</a>
    <br>
    <a id="popup-website" href="#" target="_blank">Visit Website</a>
  </div>
`;
document.body.appendChild(popup);

// Klik project
projectCards.forEach(card => {
  card.addEventListener("click", () => {
    const title = card.getAttribute("data-title");
    const desc = card.getAttribute("data-desc");
    const pdf = card.getAttribute("data-pdf");
    const github = card.getAttribute("data-github");
    const figma = card.getAttribute("data-figma");
    const website = card.getAttribute("data-website");

    document.getElementById("popup-title").innerText = title;
    document.getElementById("popup-desc").innerText = desc;

    // Embed PDF in the modal
    const pdfURL = pdf;
    document.getElementById("popup-pdf").innerHTML = `<iframe src="${pdfURL}" width="100%" height="600px"></iframe>`;

    document.getElementById("popup-link").href = github;
    document.getElementById("popup-figma").href = figma;
    document.getElementById("popup-website").href = website;

    // Show the modal
    popup.classList.add("show");
    document.body.style.overflow = "hidden";
  });
});

// Tutup popup
popup.querySelector(".close-btn").addEventListener("click", () => {
  popup.classList.remove("show");
  document.body.style.overflow = "auto";
});
