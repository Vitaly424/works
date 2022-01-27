export default () => {
   const headerHeight = document.querySelector('.js-header').clientHeight;
   const linkToUp = document.querySelector('.js-to-up');
    
   window.addEventListener('scroll', () => {
      if (window.pageYOffset >= headerHeight - headerHeight / 2) {
         linkToUp.classList.add('to-up--active');
      } else {
         linkToUp.classList.remove('to-up--active');
      }
   });
}