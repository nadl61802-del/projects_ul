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
    direction: 'vertical', 
    slidesPerView: 1,        
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
      el: '.testimonials-pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.testimonials-prev',
      nextEl: '.testimonials-next',
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
  });

// partners swiper (small screens)
let partnersSwiper = null;

const initPartnersSwiper = () => {
  const section = document.querySelector(".prtemans");
  const swiperEl = document.querySelector(".prtemans-swiper");
  if (!section || !swiperEl) {
    return;
  }

  const shouldEnable = window.innerWidth <= 768;

  if (shouldEnable && !partnersSwiper) {
    section.classList.add("is-swiper");
    partnersSwiper = new Swiper(".prtemans-swiper", {
      slidesPerView: 2.2,
      spaceBetween: 16,
      loop: true,
      speed: 600,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".prtemans-pagination",
        clickable: true,
      },
      breakpoints: {
        480: {
          slidesPerView: 3,
        },
        640: {
          slidesPerView: 4,
        },
      },
    });
  }

  if (!shouldEnable && partnersSwiper) {
    partnersSwiper.destroy(true, true);
    partnersSwiper = null;
    section.classList.remove("is-swiper");
  }
};

let partnersResizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(partnersResizeTimer);
  partnersResizeTimer = setTimeout(initPartnersSwiper, 150);
});

initPartnersSwiper();
