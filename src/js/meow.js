// function formatPrice(num) {
//   return num.toLocaleString("fa-IR");
// }

// fetch("./src/json/card.json")
//   .then((res) => res.json())
//   .then((cards) => {
//     const grid = document.querySelector(".grid-1");
//     grid.innerHTML = cards
//       .map(
//         (card) => `
//       <div class="bg-white rounded-xl shadow p-4 mb-4 flex items-center w-full font-[shabnam]" style="min-height:140px">
//         <img src="${card.image}" alt="${
//           card.title
//         }" class="w-24 h-24 object-contain ml-4" />
//         <div class="flex-1 flex flex-col justify-between">
//           <div class="text-right font-[shabnam] text-base md:text-lg text-black mb-2">${
//             card.title
//           }</div>
//           <div class="flex items-center justify-between">
//             <div class="text-gray-500 text-base line-through font-[shabnam]">${formatPrice(
//               card.oldPrice
//             )}</div>
//               <div>
//               <div class="text-[#FE5F55] font-bold text-sm mb-1">${formatPrice(
//                 card.discount
//               )} تومان تخفیف</div>
//               <div class="text-[#0B5ABD] font-bold text-lg mb-1"> ${formatPrice(
//                 card.price
//               )} تومان</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     `
//       )
//       .join("");
//   });
