 
import Swiper, { Navigation, Pagination } from "../vendor/swiper.bundle.min";
Swiper.use([Navigation, Pagination]);

export default () => { 
  let worksLgSlider = new Swiper(".js-works-slider", {
    slidesPerView: 1,
    loop: true,
    speed: 800,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  let worksMobileSlider = new Swiper(".js-works-mobile", {
    slidesPerView: 3,
    speed: 800,
    spaceBetween: 30,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 3,
      },
    },
  });
};
