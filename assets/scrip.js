 
document.addEventListener("DOMContentLoaded", () => {
  const selectores = [
    ".about-text",
    ".banner__left",
    ".banner__right",
    ".contact-card",
    ".social-card",
    ".social-row",
    ".card",
    ".left-panel",
    ".right-panel",
    ".section",
    ".instituciones",
    ".footer-top",
  ];

  const direccion = {
    ".about-text": "left",
    ".banner__left": "left",
    ".banner__right": "right",
    ".contact-card": "up",
    ".social-card": "up",
    ".social-row": "right",
    ".card": "up",
    ".left-panel": "left",
    ".right-panel": "right",
    ".section": "up",
    ".footer-top": "up",
  };

  const style = document.createElement("style");
  style.textContent = `
    .scroll-hidden {
      opacity: 0;
      transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
      will-change: opacity, transform;
    }
    .scroll-hidden.from-left  { transform: translateX(-60px); }
    .scroll-hidden.from-right { transform: translateX( 60px); }
    .scroll-hidden.from-up    { transform: translateY( 50px); }
 
    .scroll-visible {
      opacity: 1 !important;
      transform: none !important;
    }
 
    /* Retraso escalonado para grupos (menu-btn, contact-card, etc.) */
    .scroll-hidden:nth-child(1) { transition-delay: 0.05s; }
    .scroll-hidden:nth-child(2) { transition-delay: 0.13s; }
    .scroll-hidden:nth-child(3) { transition-delay: 0.21s; }
    .scroll-hidden:nth-child(4) { transition-delay: 0.29s; }
    .scroll-hidden:nth-child(5) { transition-delay: 0.37s; }
    .scroll-hidden:nth-child(6) { transition-delay: 0.45s; }
  `;
  document.head.appendChild(style);

  selectores.forEach(sel => {
    const dir = direccion[sel] || "up";
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add("scroll-hidden", `from-${dir}`);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".scroll-hidden").forEach(el => observer.observe(el));


  const parallaxEls = [
    { sel: ".banner__tagline img", speed: 0.15 },
    { sel: ".instituciones-main", speed: 0.08 },
  ];

  function applyParallax() {
    const scrollY = window.scrollY;
    parallaxEls.forEach(({ sel, speed }) => {
      document.querySelectorAll(sel).forEach(el => {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + scrollY) * speed;
        el.style.transform = `translateY(${-offset * 0.3}px)`;
      });
    });
  }

  window.addEventListener("scroll", applyParallax, { passive: true });
  applyParallax();


  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      header.style.backgroundPositionY = `${y * 0.4}px`;
    }, { passive: true });
  }

});

const btnConocer = document.getElementById('btnConocer');

window.addEventListener('scroll', () => {
  if (window.scrollY > 150) {
    btnConocer.classList.add('visible');
  } else {
    btnConocer.classList.remove('visible');
  }
});


const fab = document.getElementById('fab');
const fabBtn = document.getElementById('fabBtn');
const icons = [document.getElementById('ico0'), document.getElementById('ico1'), document.getElementById('ico2'), document.getElementById('ico3'), document.getElementById('ico4')];
const icoClose = document.getElementById('icoClose');

let current = 0;
let interval = null;
let isOpen = false;

// Cycle icons when closed
function cycleIcon() {
  icons[current].classList.remove('visible');
  icons[current].classList.add('hidden');
  current = (current + 1) % icons.length;
  icons[current].classList.remove('hidden');
  icons[current].classList.add('visible');
}

function startCycle() {
  interval = setInterval(cycleIcon, 1800);
}

function stopCycle() {
  clearInterval(interval);
  interval = null;
}

// Show all social icons hidden, show close
function openFab() {
  isOpen = true;
  stopCycle();
  icons.forEach(i => { i.classList.remove('visible'); i.classList.add('hidden'); });
  icoClose.classList.remove('hidden');
  icoClose.classList.add('visible');
  fab.classList.add('open');
}

function closeFab() {
  isOpen = false;
  icoClose.classList.remove('visible');
  icoClose.classList.add('hidden');
  icons[current].classList.remove('hidden');
  icons[current].classList.add('visible');
  fab.classList.remove('open');
  startCycle();
}

fabBtn.addEventListener('click', () => {
  isOpen ? closeFab() : openFab();
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (isOpen && !fab.contains(e.target)) closeFab();
});

// Start cycling
startCycle();


const hamburger = document.getElementById("hamburger");
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("drawerOverlay");
const drawerClose = document.getElementById("drawerClose");

function openDrawer() {
  drawer.classList.add("open");
  overlay.classList.add("open");
  hamburger.classList.add("open");
  hamburger.setAttribute("aria-expanded", true);
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  drawer.classList.remove("open");
  overlay.classList.remove("open");
  hamburger.classList.remove("open");
  hamburger.setAttribute("aria-expanded", false);
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", () => {
  drawer.classList.contains("open") ? closeDrawer() : openDrawer();
});

drawerClose.addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDrawer();
});

const socialToggle = document.getElementById("socialToggle");
const socialLinks = document.getElementById("socialLinks");

socialToggle.addEventListener("click", () => {
  socialLinks.classList.toggle("open");
  socialToggle.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".social-fab-group")) {
    socialLinks.classList.remove("open");
    socialToggle.classList.remove("active");
  }
});


setInterval(() => {
  loadData(currentIndex);
}, 10000);
const content = document.getElementById("infoContent");
content.innerHTML += content.innerHTML;
