(function () {
  window.dataLayer = window.dataLayer || [];

  /*
    ==================================================
    FORMULÁRIO
    ==================================================
    */

  const form = document.querySelector(".contato");

  if (!form) return;

  let formStarted = false;
  let formSubmitted = false;
  let formSuccess = false;

  /*
    ==================================================
    FORM START
    Dispara somente uma vez, na primeira alteração
    feita em um campo do formulário
    ==================================================
    */

  form.addEventListener("input", function () {
    if (formStarted) return;

    formStarted = true;

    dataLayer.push({
      event: "dp6_form_start",

      form_id: form.dataset.formId,

      form_name: form.dataset.formName,

      form_destination: form.dataset.formDestination,
    });
  });

  /*
    Caso o primeiro campo preenchido seja um checkbox,
    o evento change garante o disparo do form_start.
    A variável formStarted impede duplicidade.
    */

  form.addEventListener("change", function (event) {
    if (formStarted) return;

    const field = event.target;

    if (!field || (field.type !== "checkbox" && field.type !== "radio")) {
      return;
    }

    formStarted = true;

    dataLayer.push({
      event: "dp6_form_start",

      form_id: form.dataset.formId,

      form_name: form.dataset.formName,

      form_destination: form.dataset.formDestination,
    });
  });

  /*
    ==================================================
    FORM SUBMIT
    Dispara somente uma vez
    ==================================================
    */

  form.addEventListener("submit", function () {
    if (formSubmitted) return;

    formSubmitted = true;

    const submitButton = document.querySelector("#btn-enviar");

    dataLayer.push({
      event: "dp6_form_submit",
      form_id: form.dataset.formId,
      form_name: form.dataset.formName,
      form_destination: form.dataset.formDestination,
      form_submit_text: submitButton ? submitButton.textContent.trim() : "",
    });
  });

  /*
    ==================================================
    VIEW FORM SUCCESS
    Dispara somente uma vez quando o popup de sucesso
    for exibido
    ==================================================
    */

  const observer = new MutationObserver(function () {
    if (formSuccess) return;

    const body = document.body;

    if (!body.classList.contains("lightbox-open")) {
      return;
    }

    const titulo = document.querySelector(".lightbox-title");

    if (!titulo) {
      return;
    }

    if (titulo.textContent.trim() !== "Contato enviado") {
      return;
    }

    formSuccess = true;

    dataLayer.push({
      event: "dp6_form_success",

      form_id: form.dataset.formId,

      form_name: form.dataset.formName,
    });

    observer.disconnect();
  });

  observer.observe(document.body, {
    attributes: true,

    attributeFilter: ["class"],
  });
})();
