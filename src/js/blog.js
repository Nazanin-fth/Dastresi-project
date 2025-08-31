new Swiper(".swiper-blog", {
  loop: true,
  autoplay: { delay: 4000, disableOnInteraction: false },
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 24,
  pagination: {
    el: ".swiper-pagination-blog",
    clickable: true,
    type: "bullets",
  },
  breakpoints: {
    1024: {
      slidesPerView: 4,
      pagination: { el: ".swiper-pagination-blog", clickable: true },
    },
    768: {
      slidesPerView: 3,
      pagination: { el: ".swiper-pagination-blog", clickable: true },
    },
    0: {
      slidesPerGroup: 1,
      slidesPerView: 1,
      pagination: { el: ".swiper-pagination-blog", clickable: true },
    },
  },
  navigation: false,
});
