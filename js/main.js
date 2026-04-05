const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navOverlay = document.getElementById("nav-overlay");
const navClose = document.getElementById("nav-close");

const closeMenu = () => {
    navMenu.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    if (navOverlay) {
        navOverlay.classList.remove("show");
    }
};

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        const willOpen = !navMenu.classList.contains("open");
        navMenu.classList.toggle("open", willOpen);
        navToggle.classList.toggle("open", willOpen);
        navToggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
        if (navOverlay) {
            navOverlay.classList.toggle("show", willOpen);
        }
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (!navMenu.classList.contains("open")) {
                return;
            }
            closeMenu();
        });
    });
}

if (navClose) {
    navClose.addEventListener("click", closeMenu);
}

if (navOverlay) {
    navOverlay.addEventListener("click", closeMenu);
}

// bookings-swiper
  new Swiper('.mySwiper', {
    direction: 'vertical',   // التنقل فوق وتحت
    slidesPerView: 1,        // show one slide
    spaceBetween: 16,
    loop: true,
    centeredSlides: false,
    autoHeight: false,
    breakpoints: {
      0: {
        direction: 'horizontal',
      },
      900: {
        direction: 'vertical',
      },
    },
    pagination: {
      el: '.bookings-pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.bookings-prev',
      nextEl: '.bookings-next',
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
  });
