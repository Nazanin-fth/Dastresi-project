let categoriesData = [];
let categorySwiperInstance = null;

function renderCategorySlides() {
  const wrapper = document.querySelector(".swiper-2 .swiper-wrapper");
  wrapper.innerHTML = categoriesData
    .map(
      (cat) => `
        <div class="swiper-slide flex flex-col items-center justify-center">
          <img src="${cat.img}" alt="${cat.title}" class="w-auto h-auto object-contain rounded-xl mb-2" />
        </div>
      `
    )
    .join("");
}

function initCategorySwiper() {
  if (categorySwiperInstance) categorySwiperInstance.destroy(true, true);
  categorySwiperInstance = new Swiper(".swiper-2", {
    slidesPerView: 6,
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: { slidesPerView: 2 },
      640: { slidesPerView: 4 },
      1024: { slidesPerView: 6 }
    }
  });
}

fetch("./src/json/category.json")
  .then((res) => res.json())
  .then((categories) => {
    categoriesData = categories;
    renderCategorySlides();
    initCategorySwiper();
    window.addEventListener("resize", () => {
      renderCategorySlides();
      initCategorySwiper();
    });
  });