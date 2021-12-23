 


document.addEventListener("DOMContentLoaded", () => {

   "use strict";

   const sliderReviews = document.querySelector(".js-swiper-container-reviews");

   let sliderRevSwiper = new Swiper(sliderReviews, {

      slidesPerView: 1,
      spaceBetween: 30,

      // loop: true,

      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev'
      },

      pagination: {
         el: '.swiper-pagination',
         type: 'bullets',
         clickable: true
      },

      breakpoints: {
         320: {
            slidesPerView: 1,
            autoHeight: true
         },
         968: {
            slidesPerView: 2
         },
         1447: {
            slidesPerView: 3
         }
      }

   });


   const btnBurger = document.querySelector('#js-burger');
   const headerMobile = document.querySelector("#js-header-mobile");
   const headerMobileLink = document.querySelectorAll("#js-header-mobile .nav__item");
   const advantagesBtn = document.querySelector("#js-advantages-btn");
   const advantagesInfo = document.querySelector("#js-advantages-info");
   const body = document.querySelector("body");

   btnBurger.addEventListener('click', navMenu);
   advantagesBtn.addEventListener('click', openInfo);

   const links = document.querySelectorAll('a[href^="#"]');

   links.forEach(link => {
      link.addEventListener('click', (e) => {

         e.preventDefault();

         let id = link.getAttribute('href');

         document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
         });

      });
   });


   function boxMenuEndBurger() {

      if (btnBurger.classList.contains('active')) {
         btnBurger.classList.remove('active');
         body.classList.remove('active');
      } else {
         btnBurger.classList.add('active');
         body.classList.add('active');
      }

      if (headerMobile.classList.contains('active')) {
         let animate = headerMobile.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-100%)' }
         ], {
            duration: 800
         });
         animate.addEventListener('finish', function () {
            headerMobile.classList.remove('active');
         });
      } else {
         headerMobile.classList.add('active');
      }

   }


   headerMobileLink.forEach(linkMobile => {
      linkMobile.addEventListener('click', (e) => {
         e.preventDefault();
         boxMenuEndBurger();
      });
   });

   function navMenu(e) {
      e.preventDefault();
      boxMenuEndBurger();
   }

   function openInfo(e) {
      e.preventDefault();

      if (advantagesInfo.classList.contains('active')) {
         this.innerText = 'Подробнее';
         let animate = advantagesInfo.animate(
            [
               { opacity: 1, transform: 'translateX(0)' },
               { opacity: 0, transform: 'translateX(-50%)' }
            ],
            {
               duration: 500
            }
         )

         animate.addEventListener("finish", function () {
            advantagesInfo.classList.remove('active');
         });

      } else {
         advantagesInfo.classList.add('active');
         this.innerText = 'Закрыть';
      }
   }


   const inputPhone = document.querySelector('[type="tel"]');
   const form = document.querySelector("#js-form");
   const inputText = document.querySelector('[type="text"]');
   const inputTextarea = document.querySelector(".contacts__form-textarea");
   const checkboxPersonality = document.querySelector('#contacts-personality');
   const modalSucces = document.querySelector(".modal-success");
   const modalClose = document.querySelector("#js-modal-close");
   const messageQuery = document.querySelector("#js-success-message");
   const scroll = calcScroll();

   // inputText.value = 'Прикол';

   // if(checkboxPersonality.checked === false && inputText.value === '' && inputTextarea.value === '' && inputPhone.value === '') {
   //    console.log('Правда')
   // } else {
   //    console.log('Ложь')
   // }

   const maskInputPhone = new Inputmask('+7 (999) 999-99-99');
   maskInputPhone.mask(inputPhone);



   form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (inputText.value === "" || inputTextarea.value === "" || inputPhone.value === "" || checkboxPersonality.checked === false) {
         let htmlSucces = `
            <span>Заполните все поля!</span>
        `;
         messageQuery.innerHTML = htmlSucces;
         modalSucces.classList.add('active');
         body.classList.add('active');
         body.style.marginRight = `${scroll}px`;
      } else {
         console.log('Всё ок');
         let htmlSucces = `
            <span>Спасибо, ваша заявка принята!</span> <br> Мы свяжемся с вами в ближайшее время</p>
         `;
         messageQuery.innerHTML = htmlSucces;
         modalSucces.classList.add('active');
         body.classList.add('active');
         body.style.marginRight = `${scroll}px`;
         deleteInputValue();
      }
   });

   modalClose.addEventListener('click', e => {
      modalSucces.classList.remove('active');
      body.classList.remove('active');
      body.style.marginRight = `0`;
   });

   modalSucces.addEventListener('click', e => {
      if (e.target.classList.contains('modal-success')) {
         modalSucces.classList.remove('active');
         body.classList.remove('active');
         body.style.marginRight = `0`;
      }
   });

   function deleteInputValue() {
      inputText.value = "";
      inputTextarea.value = "";
      inputPhone.value = "";
   }

   function calcScroll() {
      let div = document.createElement('div');

      div.style.width = '50px';
      div.style.height = '50px';
      div.style.overflowY = 'scroll';
      div.style.visibility = 'hidden';

      document.body.appendChild(div);

      let scrollWidth = div.offsetWidth - div.clientWidth;
      div.remove();

      return scrollWidth;
   }

});

