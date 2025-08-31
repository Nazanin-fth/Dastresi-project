let bannersData = [];
let swiperInstance = null;

function renderSwiperSlides() {
  const wrapper = document.querySelector(".swiper-1 .swiper-wrapper");
  const isMobile = window.innerWidth < 768;
  wrapper.innerHTML = bannersData
    .map(
      (banner) => `
        <div class="swiper-slide">
          <a href="${banner.link}">
            <img src="${isMobile ? banner.imgMobile : banner.imgDesktop}" 
                 alt=""
                 class="object-cover h-auto rounded-xl">
          </a>
        </div>`
    )
    .join("");
}
// Initialize Swiper and destroy when resized
function initSwiper() {
  if (swiperInstance) swiperInstance.destroy(true, true);
  swiperInstance = new Swiper(".swiper-1", {
    spaceBetween: 30,
    slidesPerView: 1,
    loop: true,
    grabCursor: true,
    effect: "fade",
    autoplay: {
      delay: 1800,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
// Fetch data
fetch("./src/json/banner.json")
  .then((res) => res.json())
  .then((banners) => {
    bannersData = banners;
    renderSwiperSlides();
    initSwiper();
    window.addEventListener("resize", () => {
      renderSwiperSlides();
      initSwiper();
    });
  });
