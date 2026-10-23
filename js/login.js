'use strict';


// =========================
// FORMULAIRE DE CONNEXION
// =========================

const form =
    document.getElementById(
        'login-form'
    );


form.addEventListener(
    'submit',
    event => {


        event.preventDefault();


        // =========================
        // RÉCUPÉRATION DES ÉLÉMENTS
        // =========================

        const password =
            document.getElementById(
                'password'
            );


        const erreur =
            document.getElementById(
                'password-error'
            );


        const status =
            document.getElementById(
                'login-error'
            );


        // =========================
        // VALIDATION DU MOT DE PASSE
        // =========================

        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


        const valide =
            passwordPattern.test(
                password.value
            );


        erreur.hidden =
            valide;


        password.setAttribute(
            'aria-invalid',
            String(!valide)
        );


        if (!valide) {

            password.focus();

            return;

        }


        // =========================
        // ENREGISTREMENT DE LA CONNEXION
        // =========================

        password.value = '';


        const connexionEnregistree =
            LB.ecrire(
                'connexion',
                true
            );


        if (!connexionEnregistree) {

            status.hidden =
                false;


            status.textContent =
                'Impossible d’enregistrer la connexion.';

            return;

        }


        // =========================
        // REDIRECTION APRÈS CONNEXION
        // =========================

        const params =
            new URLSearchParams(
                location.search
            );


        const id =
            Number(
                params.get('avocat')
            );


        const avocatExiste =
            window.LEGALBRIDGE_AVOCATS.some(
                avocat =>
                    avocat.id === id
            );


        if (avocatExiste) {

            location.href =
                'avocat.html?id=' +
                id;

        } else {

            location.href =
                'index.html';

        }

    }
);