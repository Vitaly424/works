export default () => {
  const tabButtons = document.querySelectorAll(".tasks__tab");
  const tabsContent = document.querySelectorAll(".tasks__content");

  tabButtons.forEach((item) => {
    item.addEventListener("click", () => {
      const selector = item.getAttribute("data-tab");
      const currentBlock = document.querySelector(selector);

      tabsContent.forEach((item) => {
        item.classList.remove("tasks__content--active");
      });

      tabButtons.forEach((item) => {
        item.classList.remove("tasks__tab--active");
      });

      item.classList.add("tasks__tab--active");
      currentBlock.classList.add("tasks__content--active");
    });
  });

  const priceBtns = document.querySelectorAll(".price__btn");
  const priceContent = document.querySelectorAll(".price__answers");

  priceBtns.forEach((item) => {
    item.addEventListener("click", () => {
      const selector = item.getAttribute("data-tab");
      const currentBlock = document.querySelector(selector);

      priceContent.forEach((item) => {
        item.classList.remove("price__answers--active");
      });

      priceBtns.forEach((item) => {
        item.classList.remove("price__btn--active");
      });

      currentBlock.classList.add("price__answers--active");
      item.classList.add("price__btn--active");
    });
  });

  const navIconOpen = document.querySelector(".js-nav-open");
  const nav = document.querySelector(".nav");
  const navClose = document.querySelector(".js-nav-close");

  nav.addEventListener("click", ({ target }) => {
    if (target.classList.contains("nav__link")) {
      console.log("ок");
      nav.classList.remove("nav--active");
    }
  });

  navIconOpen.addEventListener("click", () => {
    nav.classList.add("nav--active");
  });

  navClose.addEventListener("click", () => {
    nav.classList.remove("nav--active");
  });
};
