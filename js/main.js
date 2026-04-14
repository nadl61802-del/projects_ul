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

// language toggle (EN / AR)
const langDropdown = document.querySelector(".lang-dropdown");
const langTrigger = document.querySelector(".lang-trigger");
const langOptions = document.querySelectorAll(".lang-option");

const I18N_BASE_URL = "i18n";
const I18N_API_URL = ""; // set API base if you want to load from backend
const translationCache = new Map();
const translationRequests = new Map();

const i18nTextNodes = Array.from(document.querySelectorAll("[data-i18n]")).map((el) => ({
  el,
  key: el.dataset.i18n,
}));

const i18nHtmlNodes = Array.from(document.querySelectorAll("[data-i18n-html]")).map((el) => ({
  el,
  key: el.getAttribute("data-i18n-html"),
}));

const i18nAttrNodes = Array.from(document.querySelectorAll("[data-i18n-attr]"))
  .map((el) => {
    const raw = el.getAttribute("data-i18n-attr") || "";
    const attrs = raw
      .split(";")
      .map((pair) => pair.trim())
      .filter(Boolean)
      .map((pair) => {
        const [attr, key] = pair.split(":").map((part) => part.trim());
        return attr && key ? { attr, key } : null;
      })
      .filter(Boolean);
    return { el, attrs };
  })
  .filter((item) => item.attrs.length > 0);

const normalizeLang = (lang) => (lang === "ar" ? "ar" : "en");

const detectBrowserLang = () => {
  if (typeof navigator === "undefined") {
    return "en";
  }
  const langs = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language];
  const hasArabic = langs.some((value) => typeof value === "string" && value.toLowerCase().startsWith("ar"));
  return hasArabic ? "ar" : "en";
};

const prefersReducedMotion = () => {
  if (!window.matchMedia) {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const startLangAnimation = async () => {
  if (prefersReducedMotion()) {
    return;
  }
  document.body.classList.add("lang-animating");
  await new Promise((resolve) => setTimeout(resolve, 120));
};

const endLangAnimation = () => {
  if (prefersReducedMotion()) {
    return;
  }
  requestAnimationFrame(() => {
    document.body.classList.remove("lang-animating");
  });
};

const buildTranslationUrl = (lang) => {
  if (I18N_API_URL) {
    return `${I18N_API_URL}${encodeURIComponent(lang)}`;
  }
  return `${I18N_BASE_URL}/${lang}.json`;
};

const loadTranslations = async (lang) => {
  if (translationCache.has(lang)) {
    return translationCache.get(lang);
  }
  if (translationRequests.has(lang)) {
    return translationRequests.get(lang);
  }

  const url = buildTranslationUrl(lang);
  const request = fetch(url, { cache: "force-cache" }).then(async (response) => {
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${lang}`);
    }
    return response.json();
  });

  translationRequests.set(lang, request);

  try {
    const dict = await request;
    translationCache.set(lang, dict);
    return dict;
  } finally {
    translationRequests.delete(lang);
  }
};

const closeLangMenu = () => {
  if (!langDropdown || !langTrigger) {
    return;
  }
  langDropdown.classList.remove("open");
  langTrigger.setAttribute("aria-expanded", "false");
};

const openLangMenu = () => {
  if (!langDropdown || !langTrigger) {
    return;
  }
  langDropdown.classList.add("open");
  langTrigger.setAttribute("aria-expanded", "true");
};

const toggleLangMenu = () => {
  if (!langDropdown) {
    return;
  }
  const willOpen = !langDropdown.classList.contains("open");
  if (willOpen) {
    openLangMenu();
  } else {
    closeLangMenu();
  }
};

let currentLang = null;

const applyLanguage = async (lang) => {
  let targetLang = normalizeLang(lang);

  if (targetLang === currentLang && translationCache.has(targetLang)) {
    return;
  }

  await startLangAnimation();

  let dict = {};
  try {
    dict = await loadTranslations(targetLang);
  } catch (error) {
    console.warn("Translation load failed:", error);
    if (targetLang !== "en") {
      targetLang = "en";
      try {
        dict = await loadTranslations(targetLang);
      } catch (fallbackError) {
        console.warn("Fallback translation load failed:", fallbackError);
      }
    }
  }

  i18nTextNodes.forEach(({ el, key }) => {
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  i18nHtmlNodes.forEach(({ el, key }) => {
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  i18nAttrNodes.forEach(({ el, attrs }) => {
    attrs.forEach(({ attr, key }) => {
      if (dict[key] !== undefined) {
        el.setAttribute(attr, dict[key]);
      }
    });
  });

  document.documentElement.lang = targetLang;
  localStorage.setItem("lang", targetLang);

  langOptions.forEach((option) => {
    const isCurrent = option.dataset.lang === targetLang;
    option.classList.toggle("is-current", isCurrent);
    option.setAttribute("aria-hidden", isCurrent ? "true" : "false");
  });

  currentLang = targetLang;
  endLangAnimation();
};

const initialLang = normalizeLang(localStorage.getItem("lang") || detectBrowserLang());
applyLanguage(initialLang);

if (langTrigger) {
  langTrigger.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleLangMenu();
  });
}

langOptions.forEach((option) => {
  option.addEventListener("click", async (event) => {
    event.stopPropagation();
    const lang = normalizeLang(option.dataset.lang);
    await applyLanguage(lang);
    closeLangMenu();
  });
});

document.addEventListener("click", (event) => {
  if (!langDropdown) {
    return;
  }
  if (!langDropdown.contains(event.target)) {
    closeLangMenu();
  }
});
