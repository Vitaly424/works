import "../vendor/imask";

export default () => {
  function telephoneMask(selector) {
    const startTelephone = document.querySelector(selector);
    const maskOptions = { mask: "+{7} (000) 000-00-00" };
    IMask(startTelephone, maskOptions);
  }

  telephoneMask(".form-modal .js-telephone");
  telephoneMask(".start-form__input.js-telephone");
  telephoneMask(".form-clients__group .js-telephone");

  telephoneMask(".case-modal#case-modal1 .js-telephone");
  telephoneMask(".case-modal#case-modal2 .js-telephone");
  telephoneMask(".case-modal#case-modal3 .js-telephone");
  telephoneMask(".case-modal#case-modal4 .js-telephone");
};