const menuContainer = document.getElementById("menu");
const overlay = document.getElementById("overlay");

// Build menu from data
function createMenu(items, isSub = false) {
  const ul = document.createElement("ul");

  ul.className = isSub
    ? "absolute right-0 top-[105%] bg-white w-[330px] z-60 rounded-b opacity-0 invisible pointer-events-none pt-2 border-t-1 border-[#e2e8f0] " +
      "group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto " +
      "transition-opacity duration-150"
    : "flex flex-row justify-between items-center mt-2 border-[#e2e8f0] space-x-6 absolute bottom-0 bg-white z-60 pt-3 active";

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.className =
      "relative group flex items-center " +
      (isSub ? "" : "border-b-2 border-transparent hover:border-[#FE5F55]");

    const a = document.createElement("a");
    a.href = item.link;
    a.textContent = item.title;

    // Blue hover for Submenus
    // Red hover for main menu
    a.className =
      "whitespace-nowrap text-[#666666] " +
      (isSub
        ? "lg:text-xs sg:text-xxs hover:text-[#0B5ABD] hover:bg-[#F5F5F5] w-full flex items-center justify-between py-3 px-3 "
        : "block lg:text-sm sg:text-xxs hover:text-[#FE5F55] group-hover:text-[#FE5F55] px-4 py-3 ");

    // Home always active
    if (!isSub && index === 0) {
      li.classList.remove("hover:border-[#FE5F55]", "border-transparent");
      li.classList.add("border-b-2", "border-[#FE5F55]");
      a.classList.add("text-[#FE5F55]", "hover:text-[#FE5F55]");
    }

    li.appendChild(a);
    // Arrow down
    if (!isSub && item.children) {
      const arrow = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      arrow.setAttribute("viewBox", "0 0 24 24");
      arrow.setAttribute("fill", "#666666");
      arrow.setAttribute("stroke", "#666666");
      arrow.setAttribute("stroke-width", "2");
      arrow.classList.add(
        "w-3",
        "h-3",
        "block",
        "ml-2",
        "mt-1",
        "transition-colors",
        "duration-200"
      );

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute("d", "M6 9l6 6 6-6H6z");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-linejoin", "round");
      arrow.appendChild(path);

      li.classList.add(
        "hover:[&>svg]:stroke-[#FE5F55]",
        "hover:[&>svg]:fill-[#FE5F55]",
        "group-hover:[&>svg]:stroke-[#FE5F55]",
        "group-hover:[&>svg]:fill-[#FE5F55]"
      );

      li.appendChild(arrow);
    }

    // Menu children
    if (item.children) {
      const submenu = createMenu(item.children, true);

      // Submenu true
      if (isSub) {
        submenu.className =
          "absolute right-full top-0 bg-white w-[330px] z-60 rounded-b opacity-0 invisible pointer-events-none transition-opacity duration-150";

        li.classList.add(
          "[&:hover>ul]:opacity-100",
          "[&:hover>ul]:visible",
          "[&:hover>ul]:pointer-events-auto"
        );
        // Arrow Left
        const arrowLeft = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        arrowLeft.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        arrowLeft.setAttribute("viewBox", "0 0 24 24");
        arrowLeft.setAttribute("fill", "none");
        arrowLeft.classList.add(
          "w-3",
          "h-3",
          "ml-0",
          "transition-colors",
          "duration-200",
          "text-[#666666]",
          "group-hover:[&>svg]:stroke-[#0B5ABD]",
          "group-hover:[&>svg]:text-[#0B5ABD]"
        );

        const pathL = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        // Left arrow path
        pathL.setAttribute("d", "M15 19l-7-7 7-7");
        pathL.setAttribute("stroke", "currentColor");
        pathL.setAttribute("stroke-width", "3");
        pathL.setAttribute("stroke-linecap", "round");
        pathL.setAttribute("stroke-linejoin", "round");
        arrowLeft.appendChild(pathL);
        // blue hover
        a.classList.add(
          "hover:[&>svg]:text-[#0B5ABD]",
          "hover:[&>svg]:stroke-[#0B5ABD]",
          "group-hover:[&>svg]:stroke-[#0B5ABD]"
        );
        a.appendChild(arrowLeft);
      }

      li.appendChild(submenu);
    }

    ul.appendChild(li);
  });

  return ul;
}

// Fetch JSON dynamically
fetch("./src/json/menu.json")
  .then((res) => res.json())
  .then((menuData) => {
    menuContainer.appendChild(createMenu(menuData));

    // overlay
    document.querySelectorAll("#menu > ul > li").forEach((li) => {
      li.addEventListener("mouseenter", () => {
        overlay.classList.remove("opacity-0", "invisible");
        overlay.classList.add("opacity-100", "visible");
      });
      li.addEventListener("mouseleave", () => {
        overlay.classList.add("opacity-0", "invisible");
        overlay.classList.remove("opacity-100", "visible");
      });
    });
  })
  .catch((err) => console.error("Error loading menu.json:", err));

// Hamburger menu toggle for mobile
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  if (
    mobileMenu.style.width === "0px" ||
    mobileMenu.style.width === "" ||
    mobileMenu.classList.contains("w-0")
  ) {
    mobileMenu.classList.remove("w-0");
    mobileMenu.classList.add("w-[300px]", "md:w-[500px]");
  } else {
    mobileMenu.classList.remove("w-[300px]", "md:w-[500px]");
    mobileMenu.classList.add("w-0");
  }
});
const mobileMenuClose = document.getElementById("mobile-menu-close");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.remove("w-0");
  mobileMenu.classList.add("w-[300px]", "md:w-[500px]");
});

mobileMenuClose.addEventListener("click", () => {
  mobileMenu.classList.remove("w-[300px]", "md:w-[500px]");
  mobileMenu.classList.add("w-0");
});