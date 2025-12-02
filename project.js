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
