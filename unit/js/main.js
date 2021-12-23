document.addEventListener("DOMContentLoaded", () => {
   const menuIcon = document.querySelector('#js-nav-icon');
   const links = document.querySelectorAll('a[href^="#"]');
   const searchForm = document.querySelector('#js-search-form')
   const clientsSlider = document.querySelector('#js-clients-slider');
   const searchButton = document.querySelector('#js-search-button');
   const searchInput = document.querySelector('#js-search-input');
   const nav = document.querySelector('#js-nav');
   const body = document.querySelector('#js-body');
   const scroll = calcScroll();

   const mediaQuery = window.matchMedia('(min-width: 1000px)');
   const mediaQuery2 =  window.matchMedia('(min-width: 899px)');
   const mediaQuery3 =  window.matchMedia('(min-width: 443px)');

   if (mediaQuery.matches) { // если больше 1000px
      new WOW().init();
   } 

   if (mediaQuery3.matches) { // Если больше 443px
      searchInput.placeholder = 'Введите текст для поиска';
   } else {
      searchInput.placeholder = 'Поиск';
   }

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

   searchButton.addEventListener('click', search);

   function search(e) {
      if (!searchForm.classList.contains('search--visible')) {
         e.preventDefault();
         searchForm.classList.toggle('search--visible');
      }
   };

   body.addEventListener('click', closeSearch);

   function closeSearch({ target }) {
      if (!target.closest('.search')) {
         searchForm.classList.remove('search--visible');
      }
   }

   menuIcon.addEventListener('click', menu);

   function menu() {
         menuIcon.classList.toggle('nav-icon--active');

         if (menuIcon.classList.contains('nav-icon--active')) {
            searchForm.classList.add('search--visible');
            body.classList.add('body--overflow');
            nav.classList.add('nav--active');
            if (mediaQuery2.matches) {
               body.style.marginRight = `${scroll}px`;
            } 
         } else {
            let animateMobile = nav.animate([
               { transform: 'rotate3d(1, 1, 1, 0deg)', opacity: 1 },
               { transform: 'rotate3d(1, 1, 1, 110deg)', opacity: 0 }
            ], {
               duration: 500
            });
   
            animateMobile.addEventListener('finish', function () {
               searchForm.classList.remove('search--visible');
               body.classList.remove('body--overflow');
               nav.classList.remove('nav--active');
               menuIcon.classList.remove('nav-icon--active');

               if (mediaQuery2.matches) { // Если больше 899px
                  body.style.marginRight = 0;
               }
            });
         }
   }

   nav.addEventListener('click', itemClick);

   function itemClick({target}) {
      if (target.closest('.nav__item')) {
         searchForm.classList.remove('search--visible');
         body.classList.remove('body--overflow');
         nav.classList.remove('nav--active');
         menuIcon.classList.remove('nav-icon--active');
      }
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

   new Swiper(clientsSlider, {
      navigation: {
         nextEl: ".slider__arrow--right",
         prevEl: ".slider__arrow--left",
      },
      pagination: {
         el: '.swiper-pagination',
      },
      slidesPerView: 1,
      flipEffect: {
         slideShadows: true,
         limitRotation: true
      },
      loop: true,
      speed: 800,
      effect: 'coverflow',
      coverflowEffect: {
         rotate: 90,
         slideShadows: false
      }
   });
});