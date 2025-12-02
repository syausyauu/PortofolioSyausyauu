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
  
  
  const cylinder = document.querySelector('.cylinder');
  const bg = document.querySelector('.background-img');
  const images = document.querySelectorAll('.cylinder img');
  
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
  const prevBtn = document.querySelector('.left');
const nextBtn = document.querySelector('.right');

prevBtn.addEventListener('click', () => {
  targetRotation += rotationPerImage;
});

nextBtn.addEventListener('click', () => {
  targetRotation -= rotationPerImage;
});
