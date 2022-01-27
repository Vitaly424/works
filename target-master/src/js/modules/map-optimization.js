export default () => {
  const footerMap = document.querySelector(".js-footer-map");

  let scrollFlag = true;
  window.addEventListener("scroll", function () {
    function optimization(section) {
      // Расположение искомого элемента на странице
      const clientsSection = document.querySelector(section);
      function getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
          top: box.top + pageYOffset,
          left: box.left + pageXOffset,
        };
      }
      const coords = getCoords(clientsSection);

      // Скроллинг страницы до элемента, нижняя граница окна
      let scrolledTo = pageYOffset + document.documentElement.clientHeight;

      // Когда доскролили до нужного элемента
      if (scrolledTo >= coords.top && scrollFlag) {
        scrollFlag = false;
        footerMap.src = footerMap.dataset.src;
        footerMap.removeAttribute('data-src');
      }
    }

    optimization('#footer');
  });
}