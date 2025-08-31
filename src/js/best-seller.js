let bestSellerData = [];
let bestSellerSwiperInstance = null;

function formatPrice(price) {
  return price ? price.toLocaleString("fa-IR") : "";
}

function renderbestSellerSlides() {
  const wrapper = document.querySelector(
    ".swiper-best-sellers .swiper-wrapper"
  );
  wrapper.innerHTML = bestSellerData
    .map((item) => {
      // Always treat color as array
      const colors = Array.isArray(item.color) ? item.color : [item.color];
      return `
      <div class="swiper-slide h-full">
        <a class="bg-white rounded-2xl shadow flex flex-col justify-between min-h-[420px] h-full relative" href="/">
          <!-- Top: Image & Colors -->
          <div class="flex flex-col items-center pt-4 pb-2 relative">
            <div class="absolute top-4 left-4 flex flex-col gap-1">
              ${colors
                .map(
                  (c) =>
                    `<span class="w-4 h-4 rounded-full" style="background:${c};border:1px solid #fff;box-shadow:0 0 0 1px #ddd"></span>`
                )
                .join("")}
            </div>
            <img
              src="${item.img}"
              alt="${item.title}"
              class="w-auto object-contain mb-4"
            />
          </div>
          <!-- Middle: Title & Category -->
          <div class="flex flex-col items-center p-2">
            <div class="text-xs text-gray-400 mb-1 font-[shabnam]">${
              item.category
            }</div>
            <div class="text-sm text-[#444] font-[shabnam] text-center line-clamp-1 hover:text-[#0a5abd] px-1 ">${
              item.title
            }</div>
          </div>
          <!-- Bottom: Price/Stock -->
          ${
            item.outOfStock
              ? `<div class="flex items-center justify-center border-t border-gray-200 bg-[#fff5f5] text-[#9a2c2c] text-sm rounded-b-2xl py-5.5 font-[shabnam]">ناموجود</div>`
              : `<div class="flex flex-col items-end px-4 pb-4 w-full">
                  <span class="text-xs text-gray-400 line-through mb-1 font-[shabnam]" style="min-height:1.5em;">${
                    item.oldPrice ? formatPrice(item.oldPrice) + " تومان" : ""
                  }</span>
                  <span class="text-[#0B5ABD] font-bold text-lg font-[shabnam]">${formatPrice(
                    item.price
                  )} تومان</span>
                </div>`
          }
        </a>
      </div>
    `;
    })
    .join("");
}

function createNavButton(className, direction) {
  const arrow = direction === "left" ? `` : ``;

  return `
    <div class="${className} ">
      ${arrow}
    </div>`;
}

function initbestSellerSwiper() {
  if (bestSellerSwiperInstance) bestSellerSwiperInstance.destroy(true, true);

  // Custom navigation buttons
  const prevBtn = document.querySelector(
    ".swiper-best-sellers .swiper-button-prev"
  );
  const nextBtn = document.querySelector(
    ".swiper-best-sellers .swiper-button-next"
  );
  if (prevBtn) prevBtn.innerHTML = createNavButton("custom-nav-prev", "left");
  if (nextBtn) nextBtn.innerHTML = createNavButton("custom-nav-next", "right");

  bestSellerSwiperInstance = new Swiper(".swiper-best-sellers", {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-best-sellers .swiper-button-next",
      prevEl: ".swiper-best-sellers .swiper-button-prev",
    },
    pagination: false,
    breakpoints: {
      0: { slidesPerView: 1.4 },
      640: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    },
  });
}

fetch("./src/json/best-seller.json")
  .then((res) => res.json())
  .then((items) => {
    bestSellerData = items;
    renderbestSellerSlides();
    initbestSellerSwiper();
    window.addEventListener("resize", () => {
      renderbestSellerSlides();
      initbestSellerSwiper();
    });
  });
