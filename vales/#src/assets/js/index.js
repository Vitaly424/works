

"use strict";

const sliderReviews = document.querySelector("#js-portfolio-slider");
const btnBurger = document.querySelector('#js-burger');
const mobileMenu = document.querySelector("#js-mobile-menu");
const headerTop = document.querySelector("#js-header-top");
const btnOpenModel = document.querySelector("#js-open-model");
const model = document.querySelector("#js-model");
const modelBtbClose = document.querySelector("#model-close");
const modelResult = document.querySelector("#js-model__form-result");
const modelContactsResult = document.querySelector("#js-contacts__form-result");

const modelPost = document.querySelector('#js-model-post');
const contactsPost = document.querySelector("#js-contacts-post");


let sliderRevSwiper = new Swiper(sliderReviews, {

   slidesPerView: 1,

   navigation: {
      nextEl: '.portfolio__btn-next',
      prevEl: '.portfolio__btn-prev'
   },

   pagination: {
      el: '.portfolio__pagination',
      type: 'bullets',
      clickable: true
   }

});

const phoneInputs = document.querySelectorAll('[type="tel"]');
const maskInputPhone = new Inputmask('+7 (999) 999-99-99');

phoneInputs.forEach(item => {
   maskInputPhone.mask(item);
})


const links = document.querySelectorAll('.nav__link[href^="#"], .header__contacts-btn[href^="#"]');

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


btnBurger.addEventListener('click', (e) => {
   e.preventDefault();

   if (btnBurger.classList.contains('active')) {
      btnBurger.classList.remove('active');
      headerTop.style.display = 'flex';
      document.body.classList.remove('active');

      let animateMobile = mobileMenu.animate([
         { transform: 'translateY(0)' },
         { transform: 'translateY(-100%)' }
      ], {
         duration: 500
      });

      animateMobile.addEventListener('finish', function () {
         mobileMenu.classList.remove('active');
      });

   } else if (!(btnBurger.classList.contains('active'))) {
      btnBurger.classList.add('active');
      mobileMenu.classList.add('active');
      headerTop.style.display = 'none';
      document.body.classList.add('active');
   }

});

mobileMenu.addEventListener('click', function (e) {
   if (e.target.classList.contains('js-nav-mobilie')) {
      headerTop.style.display = 'flex';
      document.body.classList.remove('active');
      btnBurger.classList.remove('active');
      mobileMenu.classList.remove('active');
   }
});

btnOpenModel.addEventListener("click", function () {
   if (model.classList.contains('active')) {
      model.classList.remove('active');
      document.body.classList.remove('active');
   } else if (!(model.classList.contains('active'))) {
      model.classList.add('active');
      document.body.classList.add('active');
   }
});

modelBtbClose.addEventListener('click', function () {
   if (model.classList.contains('active')) {
      let animateModelClose = model.animate(
         [
            { opacity: 1 },
            { opacity: 0 }
         ],
         {
            duration: 200
         }
      );

      animateModelClose.addEventListener('finish', function () {
         model.classList.remove('active');
         document.body.classList.remove('active');
      });
   }
});

model.addEventListener('click', function (e) {
   if (e.target.classList.contains('model__overflow')) {
      let animateModelClose = model.animate(
         [
            { opacity: 1 },
            { opacity: 0 }
         ],
         {
            duration: 200
         }
      );

      animateModelClose.addEventListener('finish', function () {
         model.classList.remove('active');
         document.body.classList.remove('active');
      });
   }
});


modelPost.addEventListener('submit', function (e) {
   e.preventDefault();

   let inputName = this.querySelector('[type="text"]');
   let inputPhone = this.querySelector('[type="tel"]');
   let inputChecked = this.querySelector('[type="checkbox"]');


   modelResult.classList.remove('active');
   if (inputName.value == '' || inputPhone.value == '' || inputChecked.checked == false) {
      modelResult.innerHTML = `
          <p class="model__form-result  model__form-result--red">Заполните поля</p>
      `
   } else {
      modelResult.innerHTML = `
         <p class="model__form-result  model__form-result--green">Спасибо, заявка отправлена <br> Мы скоро с вами свяжемся</p>
      `;

      inputPhone.value = '';
      inputName.value = '';
      inputChecked.checked = false;

      setTimeout(function () {
         modelResult.classList.add('active');
      }, 3000);

   }
});

contactsPost.addEventListener('submit', function (e) {
   e.preventDefault();

   let inputName = this.querySelector('[type="text"]');
   let inputPhone = this.querySelector('[type="tel"]');
   let inputMessage = this.querySelector("[name='message']");
   let inputChecked = this.querySelector('[type="checkbox"]');


   modelContactsResult.classList.remove('active');
   if (inputName.value == '' || inputPhone.value == '' || inputChecked.checked == false || inputMessage.value == '') {
      modelContactsResult.innerHTML = `
          <p class="model__form-result  model__form-result--red">Заполните поля</p>
      `
   } else {
      modelContactsResult.innerHTML = `
         <p class="model__form-result  model__form-result--green">Спасибо, заявка отправлена <br> Мы скоро с вами свяжемся</p>
      `;

      inputPhone.value = '';
      inputName.value = '';
      inputMessage.value = '';
      inputChecked.checked = false;

      setTimeout(function () {
         modelContactsResult.classList.add('active');
      }, 3000);

   }
});
 