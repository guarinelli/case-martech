(function () {

    const form = document.querySelector('.contato');

    if (!form) return;

    let formStarted = false;

    /*
    ============================
    FORM START
    ============================
    */

    form.addEventListener('input', function () {

        if (formStarted) return;

        formStarted = true;

        dataLayer.push({
            event: 'form_start',
            form_id: form.dataset.formId,
            form_name: form.dataset.formName,
            form_destination: form.dataset.formDestination
        });

    });


    /*
    ============================
    FORM SUBMIT
    ============================
    */

    form.addEventListener('submit', function () {

        dataLayer.push({

            event: 'form_submit',

            form_id: form.dataset.formId,

            form_name: form.dataset.formName,

            form_destination: form.dataset.formDestination,

            form_submit_text: document.querySelector('#btn-enviar').innerText.trim()

        });

    });


    /*
    ============================
    VIEW FORM SUCCESS
    ============================
    */

    const observer = new MutationObserver(function () {

        const body = document.body;

        if (!body.classList.contains('lightbox-open'))
            return;

        const titulo = document.querySelector('.lightbox-title');

        if (!titulo)
            return;

        if (titulo.textContent.trim() !== 'Contato enviado')
            return;

        dataLayer.push({

            event: 'view_form_success',

            form_id: form.dataset.formId,

            form_name: form.dataset.formName

        });

    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class'],
        subtree: false
    });

})();