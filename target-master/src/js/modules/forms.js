import "../vendor/justValidate";
import "../vendor/hystmodal.min";
 
export default () => {
   const myModal = new HystModal({
      linkAttributeName: "data-hystmodal",
      closeOnEsc: true,
      waitTransitions: true,
      backscroll: true, // блокировка страницы при открытии
   });

  function validateForms(selector, rules) {
    new window.JustValidate(selector, {
      messages: {
        link: { required: "Заполните поле" },
        name: "Заполните поле",
        phone: {
          required: "Заполните поле",
          minLength: "Заполните поле полностью",
        },
      },
      rules,
      submitHandler: function (form, values, ajax) {
        let button = form.querySelector(".button");

        button.classList.add("button--disabled");
        button.setAttribute("disabled", "disabled");

        setTimeout(() => {
          button.classList.remove("button--disabled");
          button.removeAttribute("disabled");
          myModal.open("#success");
          form.reset();
        }, 2000);

        // async function fetchData() {
        //   const url = document.location.href;
        //   const formData = new FormData(form);

        //   const response = await fetch(url + "mail.php", {
        //     method: "POST",
        //     body: formData,
        //   });

        //   const result = await response.text();

        //   if (result) {
        // button.classList.remove("button--disabled");
        // button.removeAttribute("disabled");
        // myModal.open('#success');
        //   }
        // }

        // fetchData();
      },
    });
  }

  validateForms(".js-form-modal-validate", {
    link: { required: true },
    name: { required: true },
    phone: { required: true, minLength: 18 },
  });

  validateForms(".js-form-clients-validate", {
    name: { required: true },
    phone: { required: true, minLength: 18 },
  });

  validateForms(".js-form-start", {
    link: { required: true },
    phone: { required: true, minLength: 18 },
  });

  validateForms(".js-form1-case", {
    link: { required: true },
    phone: { required: true, minLength: 18 },
  });

  validateForms(".js-form2-case", {
    link: { required: true },
    phone: { required: true, minLength: 18 },
  });

  validateForms(".js-form3-case", {
    link: { required: true },
    phone: { required: true, minLength: 18 },
  });

  validateForms(".js-form4-case", {
    link: { required: true },
    phone: { required: true, minLength: 18 },
  });
};
