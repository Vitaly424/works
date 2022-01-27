import "../vendor/hystmodal.min";

export default () => {
  const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
    closeOnEsc: true,
    waitTransitions: true,
    backscroll: true, // блокировка страницы при открытии
  });
}