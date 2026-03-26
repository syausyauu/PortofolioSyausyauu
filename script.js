/* =========================
   NAVBAR ONLY
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  const navLinks = document.querySelectorAll(".site-nav a");
  const sections = document.querySelectorAll("section[id]");

  const handleHeaderScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  const closeMobileMenu = () => {
    navToggle.classList.remove("active");
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  const openMobileMenu = () => {
    navToggle.classList.add("active");
    siteNav.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.contains("open");
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  document.addEventListener("click", (e) => {
    const clickedInsideNav = e.target.closest(".nav-container");
    if (!clickedInsideNav) {
      closeMobileMenu();
    }
  });

  const setActiveLink = () => {
    let currentId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", () => {
    handleHeaderScroll();
    setActiveLink();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });

  handleHeaderScroll();
  setActiveLink();
});
//home
/* =========================
   HOME SECTION ONLY
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const homeSection = document.querySelector(".home-section");
  const homeText = document.querySelector(".home-text");
  const homeImage = document.querySelector(".home-img");
  const heroButtons = document.querySelectorAll(".resume-btn, .secondary-btn");
  const socialLinks = document.querySelectorAll(".social-icons a");

  if (!homeSection) return;

  // reveal saat halaman dibuka
  requestAnimationFrame(() => {
    homeSection.classList.add("is-visible");
  });

  // intersection observer untuk efek muncul halus
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  revealObserver.observe(homeSection);

  // hover tilt ringan untuk gambar hero hanya di desktop
  if (homeImage && window.innerWidth > 991) {
    const imageWrap = homeImage.querySelector(".home-img-wrap");

    if (imageWrap) {
      homeImage.addEventListener("mousemove", (e) => {
        const rect = imageWrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 4;
        const rotateX = ((centerY - y) / centerY) * 4;

        imageWrap.style.transform = `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-4px)
        `;
      });

      homeImage.addEventListener("mouseleave", () => {
        imageWrap.style.transform = "";
      });
    }
  }

  // efek tekan tombol biar lebih hidup
  const pressEffect = (elements) => {
    elements.forEach((element) => {
      element.addEventListener("mousedown", () => {
        element.style.transform = "scale(0.98)";
      });

      element.addEventListener("mouseup", () => {
        element.style.transform = "";
      });

      element.addEventListener("mouseleave", () => {
        element.style.transform = "";
      });

      element.addEventListener("touchstart", () => {
        element.style.transform = "scale(0.98)";
      }, { passive: true });

      element.addEventListener("touchend", () => {
        element.style.transform = "";
      });
    });
  };

  pressEffect([...heroButtons, ...socialLinks]);
});


/* =========================
   ABOUT SECTION
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector(".about-me-section");

  if (!aboutSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutSection.classList.add("show-about");
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  observer.observe(aboutSection);
});

/* =========================
   EDUCATION SECTION
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const educationSection = document.querySelector(".education-section");

  if (!educationSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          educationSection.classList.add("show-education");
        }
      });
    },
    {
      threshold: 0.18
    }
  );

  observer.observe(educationSection);
});


/* =========================
    PROJECTS SECTION
    =========================  */
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");
  const modal = document.getElementById("projectModal");
  const modalBackdrop = document.getElementById("projectModalBackdrop");
  const modalClose = document.getElementById("projectModalClose");
  const modalTitle = document.getElementById("projectModalTitle");
  const modalDesc = document.getElementById("projectModalDesc");
  const modalMedia = document.getElementById("projectModalMedia");
  const modalLinks = document.getElementById("projectModalLinks");

  if (!projectCards.length || !modal) return;

  const isMobile = () => window.innerWidth <= 768;

  const createLinkButton = (href, text) => {
    if (!href || href.trim() === "") return "";
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  };

  const openModal = (card) => {
    const title = card.dataset.title || "Untitled Project";
    const desc = card.dataset.desc || "No description available.";
    const pdf = card.dataset.pdf || "";
    const github = card.dataset.github || "";
    const figma = card.dataset.figma || "";
    const website = card.dataset.website || "";

    modalTitle.textContent = title;
    modalDesc.textContent = desc;

    if (pdf && pdf.trim() !== "") {
      if (isMobile()) {
        modalMedia.innerHTML = `
          <a href="${pdf}" target="_blank" rel="noopener noreferrer" class="project-modal-mobile-pdf">
            View / Download PPT
          </a>
        `;
      } else {
        modalMedia.innerHTML = `
          <iframe
            src="${pdf}"
            title="${title} PDF Preview"
            loading="lazy">
          </iframe>
        `;
      }
    } else {
      modalMedia.innerHTML = "";
    }

    modalLinks.innerHTML = `
      ${createLinkButton(github, "View GitHub")}
      ${createLinkButton(figma, "View Figma")}
      ${createLinkButton(website, "Visit Website")}
    `;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modalMedia.innerHTML = "";
  };

  projectCards.forEach((card) => {
    card.addEventListener("click", () => openModal(card));
  });

  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  window.addEventListener("resize", () => {
    if (modal.classList.contains("show")) {
      const activeTitle = modalTitle.textContent;
      const activeCard = Array.from(projectCards).find(
        (card) => (card.dataset.title || "Untitled Project") === activeTitle
      );

      if (activeCard) {
        openModal(activeCard);
      }
    }
  });
});

/* =========================
   CERTIFICATION SECTION
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  function createCylinderCarousel({
    cylinderId,
    prevBtnId,
    nextBtnId,
    autoRotateDelay = 3200
  }) {
    const cylinder = document.getElementById(cylinderId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    if (!cylinder || !prevBtn || !nextBtn) return;

    const items = Array.from(cylinder.querySelectorAll("img"));
    const total = items.length;

    if (!total) return;

    let currentIndex = 0;
    let autoRotate;
    let startX = 0;
    let endX = 0;

    const getTranslateZ = () => {
      if (window.innerWidth <= 480) return 180;
      if (window.innerWidth <= 768) return 220;
      if (window.innerWidth <= 1024) return 320;
      return 450;
    };

    const getCardWidth = () => {
      if (window.innerWidth <= 480) return 210;
      if (window.innerWidth <= 768) return 250;
      if (window.innerWidth <= 1024) return 320;
      return 420;
    };

    const getCardHeight = () => {
      if (window.innerWidth <= 480) return 135;
      if (window.innerWidth <= 768) return 160;
      if (window.innerWidth <= 1024) return 200;
      return 240;
    };

    const setPositions = () => {
      const tz = getTranslateZ();
      const cardW = getCardWidth();
      const cardH = getCardHeight();
      const step = 360 / total;

      cylinder.style.setProperty("--tz", `${tz}px`);
      cylinder.style.setProperty("--card-w", `${cardW}px`);
      cylinder.style.setProperty("--card-h", `${cardH}px`);

      items.forEach((item, index) => {
        const angle = step * index;
        item.style.transform = `rotateY(${angle}deg) translateZ(${tz}px) scale(0.9)`;
      });

      updateRotation(true);
    };

    const updateDepthStyles = () => {
      items.forEach((item, index) => {
        const offset = (index - currentIndex + total) % total;

        item.classList.remove("is-active", "is-near");

        if (offset === 0) {
          item.classList.add("is-active");
          const angle = (360 / total) * index;
          item.style.transform = `rotateY(${angle}deg) translateZ(${getTranslateZ()}px) scale(1)`;
        } else if (offset === 1 || offset === total - 1) {
          item.classList.add("is-near");
          const angle = (360 / total) * index;
          item.style.transform = `rotateY(${angle}deg) translateZ(${getTranslateZ()}px) scale(0.94)`;
        } else {
          const angle = (360 / total) * index;
          item.style.transform = `rotateY(${angle}deg) translateZ(${getTranslateZ()}px) scale(0.88)`;
        }
      });
    };

    const updateRotation = (instant = false) => {
      const step = 360 / total;
      const rotation = -(currentIndex * step);
      if (instant) {
        cylinder.style.transition = "none";
        cylinder.style.transform = `rotateY(${rotation}deg)`;
        requestAnimationFrame(() => {
          cylinder.style.transition = "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        });
      } else {
        cylinder.style.transform = `rotateY(${rotation}deg)`;
      }
      updateDepthStyles();
    };

    const next = () => {
      currentIndex = (currentIndex + 1) % total;
      updateRotation();
    };

    const prev = () => {
      currentIndex = (currentIndex - 1 + total) % total;
      updateRotation();
    };

    const startAutoRotate = () => {
      stopAutoRotate();
      autoRotate = setInterval(() => {
        next();
      }, autoRotateDelay);
    };

    const stopAutoRotate = () => {
      if (autoRotate) {
        clearInterval(autoRotate);
      }
    };

    nextBtn.addEventListener("click", () => {
      next();
      startAutoRotate();
    });

    prevBtn.addEventListener("click", () => {
      prev();
      startAutoRotate();
    });

    cylinder.addEventListener("touchstart", (e) => {
      stopAutoRotate();
      startX = e.changedTouches[0].clientX;
    }, { passive: true });

    cylinder.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = endX - startX;

      if (Math.abs(diff) > 40) {
        if (diff < 0) {
          next();
        } else {
          prev();
        }
      }
      startAutoRotate();
    }, { passive: true });

    cylinder.addEventListener("mouseenter", stopAutoRotate);
    cylinder.addEventListener("mouseleave", startAutoRotate);

    window.addEventListener("resize", () => {
      setPositions();
    });

    setPositions();
    startAutoRotate();
  }

  createCylinderCarousel({
    cylinderId: "cylinder",
    prevBtnId: "prevBtn",
    nextBtnId: "nextBtn",
    autoRotateDelay: 3200
  });

  createCylinderCarousel({
    cylinderId: "cylinder2",
    prevBtnId: "prevBtn2",
    nextBtnId: "nextBtn2",
    autoRotateDelay: 3600
  });
});

/* =========================
   Organizations SECTION
   ========================= */ 
   document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("orgCarousel");
  const prevBtn = document.querySelector(".org-nav-left");
  const nextBtn = document.querySelector(".org-nav-right");

  if (!carousel) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let isDragging = false;

  const getScrollAmount = () => {
    const firstCard = carousel.querySelector(".org-card");
    if (!firstCard) return 320;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = 16;
    return cardWidth + gap;
  };

  /* nav buttons */
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      carousel.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
      });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      carousel.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
      });
    });
  }

  /* drag to scroll for desktop */
  carousel.addEventListener("mousedown", (e) => {
    isDown = true;
    isDragging = false;
    carousel.classList.add("dragging");
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("mouseleave", () => {
    isDown = false;
    carousel.classList.remove("dragging");
  });

  carousel.addEventListener("mouseup", () => {
    isDown = false;
    carousel.classList.remove("dragging");
    setTimeout(() => {
      isDragging = false;
    }, 0);
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.2;

    if (Math.abs(walk) > 4) {
      isDragging = true;
    }

    carousel.scrollLeft = scrollLeft - walk;
  });

  /* prevent accidental open link when dragging */
  carousel.querySelectorAll(".org-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (isDragging) {
        e.preventDefault();
      }
    });
  });

  /* touch works naturally on mobile, but this helps smoothness */
  carousel.addEventListener("touchstart", () => {
    isDragging = false;
  }, { passive: true });

  carousel.addEventListener("touchmove", () => {
    isDragging = true;
  }, { passive: true });
});

    /* =========================
   Organizations SECTION
   ========================= */ 
document.addEventListener("DOMContentLoaded", () => {
  const ambientContainer = document.getElementById("ambientBubbles");
  const skillSection = document.querySelector(".skill-section");

  if (!ambientContainer || !skillSection) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  function createAmbientBubble() {
    const bubble = document.createElement("span");
    bubble.className = "ambient-bubble";

    const size = Math.random() * 26 + 10;
    const left = Math.random() * 100;
    const duration = Math.random() * 7 + 8;
    const delay = Math.random() * 1.2;
    const blur = Math.random() * 1.5;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `${delay}s`;
    bubble.style.filter = `blur(${blur}px)`;

    ambientContainer.appendChild(bubble);

    bubble.addEventListener("animationend", () => {
      bubble.remove();
    });
  }

  const spawnLoop = setInterval(() => {
    if (!document.body.contains(skillSection)) {
      clearInterval(spawnLoop);
      return;
    }

    const sectionRect = skillSection.getBoundingClientRect();
    const inView = sectionRect.top < window.innerHeight && sectionRect.bottom > 0;

    if (inView) {
      createAmbientBubble();
    }
  }, 520);

  /* subtle mouse underwater drift on desktop */
  skillSection.addEventListener("mousemove", (e) => {
    if (window.innerWidth <= 768) return;

    const rect = skillSection.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;

    skillSection.style.setProperty("--mouse-x", `${x}px`);
    skillSection.style.setProperty("--mouse-y", `${y}px`);
  });

  skillSection.addEventListener("mouseleave", () => {
    skillSection.style.setProperty("--mouse-x", `0px`);
    skillSection.style.setProperty("--mouse-y", `0px`);
  });
});

/* =========================
Contact SECTION
========================= */ 
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form");
  if (!contactForm) return;

  const submitButton = contactForm.querySelector(".contact-submit-btn");
  const buttonText = submitButton.querySelector(".btn-text");

  const showSentBubble = (message) => {
    const oldBubble = document.querySelector(".sent-bubble");
    if (oldBubble) oldBubble.remove();

    const bubble = document.createElement("div");
    bubble.className = "sent-bubble";
    bubble.textContent = message;
    document.body.appendChild(bubble);

    setTimeout(() => {
      bubble.remove();
    }, 3400);
  };

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (submitButton.disabled) return;

    submitButton.disabled = true;
    buttonText.textContent = "Sending... ⏳";

    try {
      const data = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        showSentBubble("💌 Message sent successfully!");
        contactForm.reset();
      } else {
        showSentBubble("❌ Oops, something went wrong.");
      }
    } catch (error) {
      showSentBubble("❌ Network error. Please try again.");
    } finally {
      submitButton.disabled = false;
      buttonText.textContent = "Send Bubble 💌";
    }
  });
});

/* =========================
footer SECTION
========================= */ 
documen.addEventListener("DOMContentLoaded", () => {
    const year =document.getElementById("year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }
});
