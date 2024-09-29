let swiperCards = new Swiper(".cards", {
  loop: true,
  spaceBetween: 32,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
  
    // Show 3 slides for screens wider than 968px (unchanged)
    1440: {
      slidesPerView: 3,
    },
    // Show 2 slides for screens wider than 1024px (new)
    1024: {
      slidesPerView: 2,
    },
  },
});