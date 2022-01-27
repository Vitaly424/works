import sliders from "./modules/sliders";
import telephoneMask from "./modules/telephone-mask";
import lazy from "./modules/lazy";
import forms from "./modules/forms";
import tabs from "./modules/tabs";
import scroll from "./modules/scroll";
import mapOptimization from "./modules/map-optimization";
import scrollTop from "./modules/scroll-top";

document.addEventListener("DOMContentLoaded", function () {
  lazy();
  sliders();
  telephoneMask();
  forms();
  tabs();
  scroll();
  mapOptimization();
  scrollTop();
});