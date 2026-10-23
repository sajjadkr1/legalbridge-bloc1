'use strict';


// =========================
// FORMULAIRE DE CONTACT
// =========================

const form =
    document.getElementById(
        'contact-form'
    );


const status =
    document.getElementById(
        'contact-status'
    );


// =========================
// ENVOI DU FORMULAIRE
// =========================

form.addEventListener(
    'submit',
    event => {

        event.preventDefault();


        status.hidden =
            false;


        status.textContent =
            'Votre message a été envoyé avec succès.';

    }
);