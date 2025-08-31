fetch("./public/json/brands.json")
  .then((res) => res.json())
  .then((brands) => {
    const wrapper = document.querySelector(".swiper-brands .swiper-wrapper");

    brands.forEach((brand) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide flex justify-center items-center relative";
      slide.innerHTML = `
        <a class="flex flex-col items-center p-2 justify-center rounded-xl shadow-md bg-white my-4 go-up" href="${brand.url}">
          <img src="${brand.img}" class="w-24" alt="${brand.alt}">
        </a>
      `;
      wrapper.appendChild(slide);
    });

    new Swiper(".swiper-brands", {
      slidesPerView: 6,
      spaceBetween: 16,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: { slidesPerView: 3 },
        768: { slidesPerView: 6 },
      },
    });
  })
 .catch((err) => console.error("Error loading brands.json:", err));
