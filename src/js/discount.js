function formatPrice(num) {
  return num.toLocaleString("fa-IR");
}

function renderCards(cards) {
  const grid = document.querySelector(".grid-1");
  const isDesktop = window.innerWidth >= 1024; // lg breakpoint

  if (!isDesktop) {
    // Mobile & tablet - all cards in one column
    grid.innerHTML = cards
      .map(
        (card) => `
      <a href="${card.link}" class="block">
        <div class="bg-white rounded-xl shadow p-4 mb-4 flex items-center w-full" style="min-height:140px">
          <img src="${card.image}" alt="${
          card.title
        }" class="w-24 h-24 object-contain ml-4" />
          <div class="flex-1 flex flex-col justify-between gap-1">
            <div class="text-right font-[shabnam] text-base md:text-lg text-black mb-2">${
              card.title
            }</div>
            <div class="flex items-center justify-between font-[shabnam] gap-1">
              <div class="text-gray-500 text-base line-through font-[shabnam]">${formatPrice(
                card.oldPrice
              )}</div>
              <div class="flex flex-col items-center gap-2">
                <div class="text-[#FE5F55] font-normal text-sm text-center">${formatPrice(
                  card.discount
                )} تومان تخفیف</div>
                <div class="flex items-center gap-1">
                  <span class="text-[#0B5ABD] font-bold text-lg text-center">${formatPrice(
                    card.price
                  )}</span>
                  <span class="text-[#282828] text-xs">تومان</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    `
      )
      .join("");
  } else {
    // Desktop cols
    grid.innerHTML = `
      <div class="grid grid-cols-3 gap-6 h-full">
        <div class="h-full flex">
          ${cardVertical(cards[0])}
        </div>
        <div class="h-full flex">
          ${cardVertical(cards[1])}
        </div>
        <div class="flex flex-col gap-4 h-full">
          ${cards.slice(2, 6).map(cardTemplate).join("")}
        </div>
      </div>
    `;
  }
}

// Vertical card for desktop (first two columns)
function cardVertical(card) {
  return `
    <a href="${card.link}" class="block h-full w-full">
      <div class="bg-white rounded-xl shadow hover:shadow-xl p-6 flex flex-col items-center w-full h-full justify-between border-b border-l border-[#e2e2e2]">
        <img src="${card.image}" alt="${
    card.title
  }" class="w-auto object-contain mb-4" />
        <div class="text-center font-[shabnam] text-base md:text-lg text-black mb-4">${
          card.title
        }</div>
        <div class="w-full mt-auto flex flex-col items-center gap-2">
          <div class="flex items-center justify-between gap-12 font-[shabnam]">
            <div class="text-gray-500 text-base line-through font-[shabnam]">${formatPrice(
              card.oldPrice
            )}</div>
            <div class="flex flex-col gap-2">
              <div class="text-[#FE5F55] font-bold text-sm mb-1">${formatPrice(
                card.discount
              )} تومان تخفیف</div>
              <div class="flex items-center gap-1">
                <span class="text-[#0B5ABD] font-bold text-xl mb-1">${formatPrice(
                  card.price
                )}</span>
                <span class="text-[#282828] text-xs">تومان</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  `;
}

// Horizontal card for desktop (third column)
function cardTemplate(card) {
  return `
    <a href="${card.link}" class="block">
      <div class="bg-white rounded-xl shadow hover:shadow-xl p-4 flex items-center w-full h-full border-b border-l border-[#e2e2e2]" style="min-height:140px">
        <img src="${card.image}" alt="${
    card.title
  }" class="w-24 h-24 object-contain ml-4" />
        <div class="flex-1 flex flex-col justify-between">
          <div class="text-right font-[shabnam] text-base md:text-lg text-black mb-2">${
            card.title
          }</div>
          <div class="flex items-center justify-between font-[shabnam]">
            <div class="text-gray-500 text-base line-through font-[shabnam]">${formatPrice(
              card.oldPrice
            )}</div>
            <div class="flex flex-col items-center gap-2">
              <div class="text-[#FE5F55] font-bold text-sm mb-1">${formatPrice(
                card.discount
              )} تومان تخفیف</div>
              <div class="flex items-center gap-1">
                <span class="text-[#0B5ABD] font-bold text-lg mb-1">${formatPrice(
                  card.price
                )}</span>
                <span class="text-[#282828] text-xs">تومان</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  `;
}

fetch("./src/json/card.json")
  .then((res) => res.json())
  .then((cards) => {
    renderCards(cards);
    window.addEventListener("resize", () => renderCards(cards));
  });
