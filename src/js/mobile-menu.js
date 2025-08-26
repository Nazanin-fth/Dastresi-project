document.addEventListener("DOMContentLoaded", async () => {
  const mobileMenuContainer = document.querySelector(
    "#mobile-menu .overflow-auto"
  );
  const mobileMenu = document.getElementById("mobile-menu");

  if (!mobileMenuContainer) {
    console.error(
      "mobile menu container not found (#mobile-menu .overflow-auto)"
    );
    return;
  }

  function createLinkLi(title, href = "#") {
    const li = document.createElement("li");
    li.className = "border-r pr-2";
    const a = document.createElement("a");
    a.href = href;
    a.className = "block py-1 hover:text-black";
    a.textContent = title;
    li.appendChild(a);
    return li;
  }
  // Accordion

  function buildMobileMenu(data) {
    const ul = document.createElement("ul");
    ul.className = "flex flex-col space-y-2 text-right pr-2";

    data.forEach((item) => {
      const li = document.createElement("li");
      li.className = "pb-2";

      // header row
      const headerBtn = document.createElement("button");
      headerBtn.type = "button";
      headerBtn.className =
        "w-full flex justify-between items-center py-2 px-2 text-gray-600 hover:text-[#FE5F55]";
      const titleSpan = document.createElement("span");
      titleSpan.textContent = item.title;
      headerBtn.appendChild(titleSpan);
      // if it has children, add arrow
      let arrowSpan = null;
      if (item.children) {
        arrowSpan = document.createElement("span");
        arrowSpan.className = "transform transition-transform";
        arrowSpan.textContent = "›";
        headerBtn.appendChild(arrowSpan);
      }

      li.appendChild(headerBtn);

      // first null, for submenu place
      let subUl = null;
      if (item.children) {
        subUl = document.createElement("ul");
        subUl.className =
          "hidden flex-col pr-5 mt-2 space-y-1 text-sm text-gray-600";
        li.appendChild(subUl);

        // open/close submenu with click
        headerBtn.addEventListener("click", () => {
          const isOpen = !subUl.classList.contains("hidden");
          if (isOpen) {
            subUl.classList.add("hidden");
            if (arrowSpan) arrowSpan.classList.remove("rotate-90");
          } else {
            subUl.classList.remove("hidden");
            if (arrowSpan) arrowSpan.classList.add("rotate-90");
            // render if not rendered yet
            if (subUl.childElementCount === 0) {
              item.children.forEach((child) => {
                // 2nd level with children
                if (
                  child.children &&
                  Array.isArray(child.children) &&
                  child.children.length
                ) {
                  const childLi = document.createElement("li");
                  childLi.className = "pb-1";

                  const childBtn = document.createElement("button");
                  childBtn.type = "button";
                  childBtn.className =
                    "w-full flex justify-between items-center py-1 px-1 text-gray-600 hover:text-black";
                  const childTitle = document.createElement("span");
                  childTitle.textContent = child.title;
                  childBtn.appendChild(childTitle);

                  const childArrow = document.createElement("span");
                  childArrow.className = "transform transition-transform";
                  childArrow.textContent = "›";
                  childBtn.appendChild(childArrow);

                  const childSubUl = document.createElement("ul");
                  childSubUl.className =
                    "hidden flex-col pr-4 mt-1 text-xs text-gray-500";

                  // third level items
                  child.children.forEach((subChild) => {
                    const subLi = document.createElement("li");
                    subLi.innerHTML = `<a href="${subChild.link}" class="block py-1 hover:text-black">${subChild.title}</a>`;
                    childSubUl.appendChild(subLi);
                  });

                  // Open/close child submenu
                  childBtn.addEventListener("click", () => {
                    childSubUl.classList.toggle("hidden");
                    childArrow.classList.toggle("rotate-90");
                  });

                  childLi.appendChild(childBtn);
                  childLi.appendChild(childSubUl);
                  subUl.appendChild(childLi);
                } else {
                  // level two simple item
                  const simpleLi = createLinkLi(child.title, child.link);
                  subUl.appendChild(simpleLi);
                }
              });
            }
          }
        });
      }

      ul.appendChild(li);
    });

    return ul;
  }

  // fetch menu data
  try {
    const res = await fetch("./src/json/menu.json");
    if (!res.ok) throw new Error("Could not load menu.json: " + res.status);
    const menuData = await res.json();

    // mount mobile menu
    mobileMenuContainer.appendChild(buildMobileMenu(menuData));
  } catch (err) {
    console.error("Failed to load menu.json", err);
  }
});
