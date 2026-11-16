'use strict';


// =========================
// LIBELLÉS DES SPÉCIALITÉS
// =========================

const specialites = {
    immigration: 'Droit des étrangers',
    travail: 'Droit du travail',
    logement: 'Droit du logement',
    "demande d'asile": 'Demande d’asile',
    "droit pénal": 'Droit pénal'
};


// =========================
// RÉCUPÉRATION DE L'AVOCAT
// =========================

const params =
    new URLSearchParams(
        location.search
    );


const id =
    Number(
        params.get('id')
    );


const avocat =
    window.LEGALBRIDGE_AVOCATS.find(
        avocat =>
            avocat.id === id
    );


const detail =
    document.getElementById(
        'detail'
    );


// =========================
// AVOCAT INTROUVABLE
// =========================

if (!avocat) {

    detail.innerHTML = `
        <p class="loading-message">

            Avocat introuvable.

            <a href="avocats.html">
                Retour à la liste
            </a>

        </p>
    `;

} else {


    // =========================
    // SPÉCIALITÉ AFFICHÉE
    // =========================

    const specialiteAffichee =
        specialites[
            avocat.specialite
        ] ||
        avocat.specialite;


    // =========================
    // TITRE DE LA PAGE
    // =========================

    document.title =
        avocat.nom +
        ' | LegalBridge';


    // =========================
    // AFFICHAGE DU PROFIL
    // =========================

    detail.innerHTML = `

        <div class="detail-container">

            <article class="detail-card">


                <img
                    class="detail-image"
                    src="${LB.texte(avocat.img)}"
                    alt="Photo de ${LB.texte(avocat.nom)}"
                >


                <div class="detail-info">


                    <h1>
                        ${LB.texte(avocat.nom)}
                    </h1>


                    <p>

                        <strong>
                            Spécialité :
                        </strong>

                        ${LB.texte(
                            specialiteAffichee
                        )}

                    </p>


                    <p>

                        <strong>
                            Ville :
                        </strong>

                        ${LB.texte(avocat.ville)}

                    </p>


                    <p>

                        <strong>
                            Langues :
                        </strong>

                        ${LB.texte(
                            avocat.langues.join(', ')
                        )}

                    </p>


                    <p>

                        <strong>
                            Email :
                        </strong>

                        ${
                            avocat.email
                                ? LB.texte(avocat.email)
                                : 'Non disponible'
                        }

                    </p>


                    <p>

                        <strong>
                            Téléphone :
                        </strong>

                        ${
                            avocat.telephone
                                ? LB.texte(avocat.telephone)
                                : 'Non disponible'
                        }

                    </p>


                    <p>

                        <strong>
                            Adresse :
                        </strong>

                        ${
                            avocat.adresse
                                ? LB.texte(avocat.adresse)
                                : 'Non disponible'
                        }

                    </p>


                    <p>

                        <strong>
                            Description :
                        </strong>

                        ${
                            avocat.description
                                ? LB.texte(avocat.description)
                                : 'Non disponible'
                        }

                    </p>


                    <button
                        type="button"
                        id="open-appointment"
                        aria-expanded="false"
                        aria-controls="appointment-form"
                    >
                        Prendre rendez-vous
                    </button>


                    <!-- Formulaire de rendez-vous -->

                    <form
                        class="rendez-vous-form"
                        id="appointment-form"
                        hidden
                    >

                        <h2>
                            Prendre rendez-vous avec
                            ${LB.texte(avocat.nom)}
                        </h2>


                        <label for="date-rendez-vous">
                            Date du rendez-vous
                        </label>


                        <input
                            id="date-rendez-vous"
                            type="date"
                            required
                        >


                        <label for="heure-rendez-vous">
                            Heure du rendez-vous
                        </label>


                        <input
                            id="heure-rendez-vous"
                            type="time"
                            required
                        >


                        <label for="motif">
                            Motif du rendez-vous
                        </label>


                        <textarea
                            id="motif"
                            name="motif"
                            required
                            maxlength="1000"
                        ></textarea>


                        <button type="submit">
                            Confirmer le rendez-vous
                        </button>

                    </form>


                    <p
                        class="success-message"
                        id="appointment-status"
                        role="status"
                        hidden
                    ></p>


                    <p>

                        <a href="avocats.html">
                            Retour à la liste
                        </a>

                    </p>


                </div>

            </article>

        </div>
    `;


    // =========================
    // DATE MINIMUM
    // =========================

    const date =
        document.getElementById(
            'date-rendez-vous'
        );


    const now =
        new Date();


    date.min = [

        now.getFullYear(),

        String(
            now.getMonth() + 1
        ).padStart(
            2,
            '0'
        ),

        String(
            now.getDate()
        ).padStart(
            2,
            '0'
        )

    ].join('-');

        // =========================
    // DONNÉES STRUCTURÉES
    // =========================

    const donneesStructurees = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "name": avocat.nom + " | LegalBridge",
        "mainEntity": {
            "@type": "Person",
            "name": avocat.nom,
            "jobTitle": "Avocat",
            "knowsAbout": specialiteAffichee,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": avocat.ville,
                "addressCountry": "FR"
            },
            "knowsLanguage": avocat.langues
        },
        "inLanguage": "fr-FR"
    };

    const scriptJsonLd =
        document.createElement('script');

    scriptJsonLd.type =
        'application/ld+json';

    scriptJsonLd.textContent =
        JSON.stringify(donneesStructurees);

    document.head.appendChild(scriptJsonLd);

    // =========================
    // OUVRIR LE FORMULAIRE
    // =========================

    const openAppointmentButton =
        document.getElementById(
            'open-appointment'
        );


    const appointmentForm =
        document.getElementById(
            'appointment-form'
        );


    openAppointmentButton.addEventListener(
        'click',
        () => {


            // Vérifie si l'utilisateur
            // est connecté

            if (
                !LB.lire(
                    'connexion',
                    false
                )
            ) {

                location.href =
                    'login.html?avocat=' +
                    avocat.id;

                return;

            }


            appointmentForm.hidden =
                false;


            openAppointmentButton.setAttribute(
                'aria-expanded',
                'true'
            );


            date.focus();

        }
    );


    // =========================
    // CONFIRMER LE RENDEZ-VOUS
    // =========================

    appointmentForm.addEventListener(
        'submit',
        event => {


            event.preventDefault();


            // Vérifie si l'utilisateur
            // est toujours connecté

            if (
                !LB.lire(
                    'connexion',
                    false
                )
            ) {

                return;

            }


            const heure =
                document.getElementById(
                    'heure-rendez-vous'
                ).value;


            const motif =
                document.getElementById(
                    'motif'
                )
                    .value
                    .trim();


            const status =
                document.getElementById(
                    'appointment-status'
                );


            status.hidden =
                false;


            // Vérifie la date,
            // l'heure et le motif

            if (
                !date.value ||
                !heure ||
                !motif ||
                new Date(
                    date.value +
                    'T' +
                    heure
                ) <= new Date()
            ) {

                status.textContent =
                    'Choisissez une date et une heure futures, et renseignez un motif.';

                return;

            }


            // Récupère les rendez-vous
            // déjà enregistrés

            const rendezVous =
                LB.lire(
                    'rendezvous',
                    []
                );


            // Vérifie si ce créneau
            // existe déjà

            const existeDeja =
                rendezVous.some(
                    rendezVous =>

                        rendezVous.id ===
                            avocat.id &&

                        rendezVous.date ===
                            date.value &&

                        rendezVous.heure ===
                            heure
                );


            if (existeDeja) {

                status.textContent =
                    'Un rendez-vous existe déjà pour ce créneau.';

                return;

            }


            // Ajoute le nouveau rendez-vous

            rendezVous.push({

                id: avocat.id,

                nom: avocat.nom,

                date: date.value,

                heure: heure,

                motif: motif

            });


            // Enregistre le rendez-vous

            const enregistre =
                LB.ecrire(
                    'rendezvous',
                    rendezVous
                );


            if (!enregistre) {

                status.textContent =
                    'Une erreur est survenue lors de l’enregistrement du rendez-vous.';

                return;

            }


            // Message de confirmation

            status.textContent =
                'Votre rendez-vous a été enregistré avec succès.';


            // Réinitialise le formulaire

            event.target.reset();


            event.target.hidden =
                true;


            openAppointmentButton.setAttribute(
                'aria-expanded',
                'false'
            );

        }
    );

}