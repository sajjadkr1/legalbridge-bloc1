'use strict';


// =========================
// FORMULAIRE DE CONNEXION
// =========================

const form =
    document.getElementById(
        'login-form'
    );
const email = document.getElementById('email');

const password = document.getElementById('password');

const emailError = document.getElementById('email-error');

const passwordError = document.getElementById('password-error');

function verifierEmail() {
    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const valide = emailPattern.test(email.value);

    emailError.hidden = valide;

    email.setAttribute('aria-invalid', String(!valide)
);
return valide;
}
email.addEventListener('input', verifierEmail);

function verifierPassword() {
    const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const valide = passwordPattern.test(password.value);

    passwordError.hidden = valide;

    password.setAttribute(
        'aria-invalid', String(!valide)
    );
    return valide;
}
password.addEventListener(
    'input',
    verifierPassword
);
form.addEventListener(
    'submit',
    event => {


        event.preventDefault();


        // =========================
        // RÉCUPÉRATION DES ÉLÉMENTS
        // =========================



        const status =
            document.getElementById(
                'login-error'
            );


        // =========================
        // VALIDATION DU MOT DE PASSE
        // =========================

        const emailValide = verifierEmail();
        const passwordValide = verifierPassword();
        if (!emailValide || !passwordValide) {
         if (!emailValide) {
            email.focus();
         } else {
            password.focus();
         }
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