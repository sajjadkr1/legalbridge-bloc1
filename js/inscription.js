
const form =
    document.getElementById('inscription-form');

const nom =
    document.getElementById('nom');

const prenom =
    document.getElementById('prenom');

const email =
    document.getElementById('email');

const password =
    document.getElementById('password');

const confirmPassword =
    document.getElementById('confirm-password');

const emailError =
    document.getElementById('email-error');

const passwordError =
    document.getElementById('password-error');

const confirmError =
    document.getElementById('confirm-error');

const inscriptionMessage =
    document.getElementById('inscription-message');

const togglePassword =
    document.getElementById('toggle-password');

const toggleConfirmPassword =
    document.getElementById('toggle-confirm-password');


// =========================
// VERIFICATION MOT DE PASSE
// =========================

const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


// =========================
// VALIDATION EN TEMPS RÉEL
// =========================

// Vérifier l'email pendant la saisie

email.addEventListener('input', () => {

    if (email.value.trim() === '') {

        emailError.hidden = true;

    } else {

        emailError.hidden = email.validity.valid;

    }

});


// Vérifier le mot de passe pendant la saisie

password.addEventListener('input', () => {

    passwordError.hidden =
        passwordPattern.test(password.value);

    // Vérifier aussi la confirmation
    // si elle contient déjà une valeur

    if (confirmPassword.value !== '') {

        confirmError.hidden =
            password.value === confirmPassword.value;

    }

});


// Vérifier la confirmation pendant la saisie

confirmPassword.addEventListener('input', () => {

    confirmError.hidden =
        confirmPassword.value === password.value;

});


// =========================
// AFFICHER / MASQUER
// LE MOT DE PASSE
// =========================

togglePassword.addEventListener(
    'click',
    () => {

        if (password.type === 'password') {

            password.type = 'text';

            togglePassword.textContent = '🙈';

        } else {

            password.type = 'password';

            togglePassword.textContent = '👁';

        }

    }
);


// =========================
// AFFICHER / MASQUER
// LA CONFIRMATION
// =========================

toggleConfirmPassword.addEventListener(
    'click',
    () => {

        if (confirmPassword.type === 'password') {

            confirmPassword.type = 'text';

            toggleConfirmPassword.textContent = '🙈';

        } else {

            confirmPassword.type = 'password';

            toggleConfirmPassword.textContent = '👁';

        }

    }
);


// =========================
// INSCRIPTION
// =========================

form.addEventListener(
    'submit',
    (event) => {

        event.preventDefault();

        emailError.hidden = true;

        passwordError.hidden = true;

        confirmError.hidden = true;

        inscriptionMessage.hidden = true;


        // Vérifie le mot de passe

        if (!passwordPattern.test(password.value)) {

            passwordError.hidden = false;

            return;

        }


        // Vérifie que les deux mots de passe sont identiques

        if (password.value !== confirmPassword.value) {

            confirmError.hidden = false;

            return;

        }


        // Message de succès

        inscriptionMessage.textContent =
            'Compte créé avec succès';

        inscriptionMessage.hidden = false;


        // Réinitialise le formulaire

        form.reset();


        // Retour vers la connexion

        setTimeout(
            () => {

                window.location.href = 'login.html';

            },
            1500
        );

    }
);
