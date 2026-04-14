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
const langCurrent = document.querySelector(".lang-current");
const langOptions = document.querySelectorAll(".lang-option");

const i18n = {
  en: {
    "lang.code": "EN",
    "lang.aria": "Change language",
    "nav.destinations": "Destinations",
    "nav.hotels": "Hotels",
    "nav.flights": "Flights",
    "nav.booking": "booking",
    "nav.testimonials": "testimonials",
    "nav.signup": "Sign up",
    "hero.tag": "BEST DESTINATIONS AROUND THE WORLD",
    "hero.title": "Travel, <span class=\"underline d-inline-block position-relative\">enjoy</span> and live a new and full life",
    "hero.text": "Built Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed listening. Park gate sell they west hard for the.",
    "hero.cta": "Find out more",
    "hero.play": "Play Demo",
    "services.subtitle": "CATEGORY",
    "services.title": "We Offer Best Services",
    "services.weather.title": "Calculated Weather",
    "services.weather.text": "Built Wicket longer admire do barton vanity itself do in it.",
    "services.flights.title": "Best Flights",
    "services.flights.text": "Engrossed listening. Park gate sell they west hard for the.",
    "flights.subtitle": "TOP SELLING",
    "flights.title": "Top Destinations",
    "flights.rome.title": "Rome, Italty",
    "flights.rome.days": "10 Days Trip",
    "flights.london.title": "London, UK",
    "flights.london.days": "12 Days Trip",
    "flights.europe.title": "Full Europe",
    "flights.europe.days": "28 Days Trip",
    "booking.tag": "Easy and Fast",
    "booking.title": "Book Your Next Trip<br>In 3 Easy Steps",
    "booking.step1.title": "Choose Destination",
    "booking.step2.title": "Make Payment",
    "booking.step3.title": "Reach Airport on Selected Date",
    "booking.step.text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.",
    "booking.card.title": "Trip To Greece",
    "booking.card.sub": "14-29 June &nbsp;|&nbsp; by Robbin Joseph",
    "booking.card.going": "24 people going",
    "booking.mini.label": "Ongoing",
    "booking.mini.title": "Trip to Rome",
    "booking.mini.pct": "40% completed",
    "testimonials.subtitle": "Testimonials",
    "testimonials.title": "What People Say About Us.",
    "testimonials.quote1": "On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.",
    "testimonials.quote2": "Believed or diverted no. Of believed admire do barton vanity itself do. Windows talking painted pasture yet its express parties use.",
    "testimonials.quote3": "Sure last upon he same as knew next. Of believed or diverted no. Express parties use painting pasture yet its windows talking.",
    "sub.title": "Subscribe to get information, latest news and other interesting offers about Jadoo",
    "sub.email": "Your email",
    "sub.button": "Subscribe",
    "footer.brand.desc": "Book your trip in minute, get full control for much longer.",
    "footer.company.title": "Company",
    "footer.company.about": "About",
    "footer.company.careers": "Careers",
    "footer.company.mobile": "Mobile",
    "footer.contact.title": "Contact",
    "footer.contact.help": "Help/FAQ",
    "footer.contact.press": "Press",
    "footer.contact.affiliates": "Affiliates",
    "footer.more.title": "More",
    "footer.more.fees": "Airline fees",
    "footer.more.airline": "Airline",
    "footer.more.tips": "Low fare tips",
    "footer.app.label": "Discover our app",
    "footer.app.get": "Get it on",
    "footer.app.google": "Google Play",
    "footer.app.download": "Download on the",
    "footer.app.store": "App Store",
    "footer.rights": "All rights reserved © jadoo.co",
  },
  ar: {
    "lang.code": "AR",
    "lang.aria": "تغيير اللغة",
    "nav.destinations": "الوجهات",
    "nav.hotels": "الفنادق",
    "nav.flights": "الرحلات",
    "nav.booking": "الحجوزات",
    "nav.testimonials": "آراء العملاء",
    "nav.signup": "سجّل",
    "hero.tag": "أفضل الوجهات حول العالم",
    "hero.title": "سافر، <span class=\"underline d-inline-block position-relative\">استمتع</span> وعش حياة جديدة ومليئة",
    "hero.text": "تم بناء ويكيت أطول وأُعجب بارتون بغروره في ذلك. فضّلها الرياضيون وانغمسوا في الاستماع. باعوا بوابة الحديقة غربًا بصعوبة.",
    "hero.cta": "اعرف المزيد",
    "hero.play": "شغّل العرض",
    "services.subtitle": "الفئة",
    "services.title": "نقدّم أفضل الخدمات",
    "services.weather.title": "تنبؤات الطقس",
    "services.weather.text": "تم بناء ويكيت أطول وأُعجب بارتون بغروره في ذلك.",
    "services.flights.title": "أفضل الرحلات",
    "services.flights.text": "انغمسوا في الاستماع. باعوا بوابة الحديقة غربًا بصعوبة.",
    "flights.subtitle": "الأكثر مبيعًا",
    "flights.title": "أفضل الوجهات",
    "flights.rome.title": "روما، إيطاليا",
    "flights.rome.days": "رحلة 10 أيام",
    "flights.london.title": "لندن، المملكة المتحدة",
    "flights.london.days": "رحلة 12 يومًا",
    "flights.europe.title": "أوروبا بالكامل",
    "flights.europe.days": "رحلة 28 يومًا",
    "booking.tag": "سهل وسريع",
    "booking.title": "احجز رحلتك القادمة<br>في 3 خطوات سهلة",
    "booking.step1.title": "اختر الوجهة",
    "booking.step2.title": "أكمل الدفع",
    "booking.step3.title": "اذهب إلى المطار في التاريخ المحدد",
    "booking.step.text": "هذا نص تجريبي يوضح تفاصيل الخطوة.",
    "booking.card.title": "رحلة إلى اليونان",
    "booking.card.sub": "14-29 يونيو &nbsp;|&nbsp; بواسطة روبين جوزيف",
    "booking.card.going": "24 شخصًا ينضمون",
    "booking.mini.label": "جارية",
    "booking.mini.title": "رحلة إلى روما",
    "booking.mini.pct": "اكتمل 40%",
    "testimonials.subtitle": "آراء العملاء",
    "testimonials.title": "ماذا يقول الناس عنا.",
    "testimonials.quote1": "على الرغم من الحديث عن النوافذ والمرعى الملوّن، كانت الرحلات السريعة تستخدمه. بالتأكيد كان آخره مثل التالي الذي عرفه. لا تصديق ولا التفات.",
    "testimonials.quote2": "لا تصديق ولا التفات. من الإعجاب فعل بارتون غروره نفسه. حديث النوافذ والمرعى الملوّن تستخدمه الرحلات السريعة.",
    "testimonials.quote3": "بالتأكيد كان آخره مثل التالي الذي عرفه. لا تصديق ولا التفات. تستخدم الرحلات السريعة المرعى الملوّن وحديث النوافذ.",
    "sub.title": "اشترك للحصول على المعلومات وآخر الأخبار والعروض المميزة عن جادو",
    "sub.email": "بريدك الإلكتروني",
    "sub.button": "اشترك",
    "footer.brand.desc": "احجز رحلتك في دقيقة، وتحكّم بالكامل لفترة أطول.",
    "footer.company.title": "الشركة",
    "footer.company.about": "من نحن",
    "footer.company.careers": "وظائف",
    "footer.company.mobile": "تطبيق الجوال",
    "footer.contact.title": "تواصل",
    "footer.contact.help": "المساعدة/الأسئلة الشائعة",
    "footer.contact.press": "الصحافة",
    "footer.contact.affiliates": "الشركاء",
    "footer.more.title": "المزيد",
    "footer.more.fees": "رسوم خطوط الطيران",
    "footer.more.airline": "شركة الطيران",
    "footer.more.tips": "نصائح الأسعار المنخفضة",
    "footer.app.label": "اكتشف تطبيقنا",
    "footer.app.get": "احصل عليه من",
    "footer.app.google": "Google Play",
    "footer.app.download": "نزّل من",
    "footer.app.store": "App Store",
    "footer.rights": "جميع الحقوق محفوظة © jadoo.co",
  },
};

const normalizeLang = (lang) => (lang === "ar" ? "ar" : "en");

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

const applyLanguage = (lang) => {
  const resolvedLang = normalizeLang(lang);
  const dict = i18n[resolvedLang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const raw = el.getAttribute("data-i18n-attr") || "";
    raw
      .split(";")
      .map((pair) => pair.trim())
      .filter(Boolean)
      .forEach((pair) => {
        const [attr, key] = pair.split(":").map((part) => part.trim());
        if (!attr || !key) {
          return;
        }
        if (dict[key] !== undefined) {
          el.setAttribute(attr, dict[key]);
        }
      });
  });

  document.documentElement.lang = resolvedLang;
  localStorage.setItem("lang", resolvedLang);
  if (langCurrent && dict["lang.code"]) {
    langCurrent.textContent = dict["lang.code"];
  }
  langOptions.forEach((option) => {
    const isCurrent = option.dataset.lang === resolvedLang;
    option.classList.toggle("is-current", isCurrent);
    option.setAttribute("aria-hidden", isCurrent ? "true" : "false");
  });
};

const initialLang = normalizeLang(localStorage.getItem("lang") || document.documentElement.lang || "en");
applyLanguage(initialLang);

if (langTrigger) {
  langTrigger.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleLangMenu();
  });
}

langOptions.forEach((option) => {
  option.addEventListener("click", (event) => {
    event.stopPropagation();
    const lang = normalizeLang(option.dataset.lang);
    applyLanguage(lang);
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
