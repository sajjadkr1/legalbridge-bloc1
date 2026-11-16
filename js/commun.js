'use strict';


// =========================
// OUTILS LEGALBRIDGE
// =========================

window.LegalBridge = {

    lire(cle, defaut) {

        try {

            const valeur =
                sessionStorage.getItem(
                    'legalbridge-' + cle
                );

            return valeur !== null
                ? JSON.parse(valeur)
                : defaut;

        } catch {

            return defaut;

        }

    },


    ecrire(cle, valeur) {

        try {

            sessionStorage.setItem(
                'legalbridge-' + cle,
                JSON.stringify(valeur)
            );

            return true;

        } catch {

            return false;

        }

    },


    texte(texte) {

        return String(
            texte ?? ''
        ).replace(
            /[&<>"']/g,
            caractere => ({

                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'

            })[caractere]
        );

    },


    normaliser(texte) {

        return String(
            texte || ''
        )
            .normalize('NFD')
            .replace(
                /[\u0300-\u036f]/g,
                ''
            )
            .toLowerCase()
            .trim();

    }

};


const LB =
    window.LegalBridge;

// =========================
// POLICE ACCESSIBLE
// =========================

const boutonPolice =
    document.getElementById('police-toggle');


// Lire le choix enregistré

let policeActivee = false;

try {

    policeActivee =
        localStorage.getItem('legalbridge-police-dyslexie') === 'active';

} catch {

    policeActivee = false;

}


// Appliquer la police

document.body.classList.toggle(
    'police-dyslexie',
    policeActivee
);


// Mettre à jour le bouton

function mettreAJourBoutonPolice() {

    if (!boutonPolice) {
        return;
    }

    boutonPolice.setAttribute(
        'aria-pressed',
        String(policeActivee)
    );

    boutonPolice.textContent = 'Aa';

}


// Activer ou désactiver la police

if (boutonPolice) {

    boutonPolice.addEventListener('click', () => {

        policeActivee = !policeActivee;

        document.body.classList.toggle(
            'police-dyslexie',
            policeActivee
        );

        try {

            localStorage.setItem(
                'legalbridge-police-dyslexie',
                policeActivee ? 'active' : 'inactive'
            );

        } catch {

            // Le site continue même si le stockage est indisponible

        }

        mettreAJourBoutonPolice();

    });

}


mettreAJourBoutonPolice();

// =========================
// NAVIGATION
// =========================

function mettreAJourNavigation() {

    const connecte =
        LB.lire(
            'connexion',
            false
        );


    const loginLink =
        document.getElementById(
            'login-link'
        );


    const appointmentsItem =
        document.getElementById(
            'appointments-item'
        );


    const logoutItem =
        document.getElementById(
            'logout-item'
        );


    if (loginLink) {

        loginLink.hidden =
            connecte;

    }


    if (appointmentsItem) {

        appointmentsItem.hidden =
            !connecte;

    }


    if (logoutItem) {

        logoutItem.hidden =
            !connecte;

    }

}


mettreAJourNavigation();


// =========================
// RENDEZ-VOUS
// =========================

const popup =
    document.getElementById(
        'appointments-popup'
    );


const toggle =
    document.getElementById(
        'appointments-toggle'
    );


const appointmentsList =
    document.getElementById(
        'appointments-list'
    );


function fermerPopup() {

    if (!popup || !toggle) {

        return;

    }


    popup.hidden =
        true;


    toggle.setAttribute(
        'aria-expanded',
        'false'
    );

}


// =========================
// AFFICHER LES RENDEZ-VOUS
// =========================

if (toggle && popup) {

    toggle.addEventListener(
        'click',
        () => {


            if (
                !LB.lire(
                    'connexion',
                    false
                )
            ) {

                return;

            }


            popup.hidden =
                !popup.hidden;


            toggle.setAttribute(
                'aria-expanded',
                String(!popup.hidden)
            );


            if (!appointmentsList) {

                return;

            }


            const rendezVous =
                LB.lire(
                    'rendezvous',
                    []
                );


            if (rendezVous.length === 0) {

                appointmentsList.innerHTML = `
                    <p class="rendez-vous-item">
                        Aucun rendez-vous pour le moment.
                    </p>
                `;

                return;

            }


            appointmentsList.innerHTML =
                rendezVous
                    .map(
                        rendezVous => `

                            <div class="rendez-vous-item">

                                <p>
                                    <strong>
                                        Avocat :
                                    </strong>

                                    ${LB.texte(
                                        rendezVous.nom
                                    )}
                                </p>


                                <p>
                                    <strong>
                                        Date :
                                    </strong>

                                    ${LB.texte(
                                        rendezVous.date
                                    )}
                                </p>


                                <p>
                                    <strong>
                                        Heure :
                                    </strong>

                                    ${LB.texte(
                                        rendezVous.heure
                                    )}
                                </p>


                                <p>
                                    <strong>
                                        Motif :
                                    </strong>

                                    ${LB.texte(
                                        rendezVous.motif
                                    )}
                                </p>


                                <p>
                                    <strong>
                                        Statut :
                                    </strong>

                                    Confirmé
                                </p>

                            </div>

                        `
                    )
                    .join('');

        }
    );

}


// =========================
// FERMER LE POPUP
// =========================

const closeButton =
    document.getElementById(
        'appointments-close'
    );


if (closeButton) {

    closeButton.addEventListener(
        'click',
        () => {

            fermerPopup();

            if (toggle) {

                toggle.focus();

            }

        }
    );

}


// =========================
// FERMETURE AVEC ÉCHAP
// =========================

document.addEventListener(
    'keydown',
    event => {


        if (
            event.key === 'Escape' &&
            popup &&
            !popup.hidden
        ) {

            fermerPopup();


            if (toggle) {

                toggle.focus();

            }

        }

    }
);


// =========================
// FERMETURE AU CLIC EXTÉRIEUR
// =========================

document.addEventListener(
    'click',
    event => {


        if (
            popup &&
            toggle &&
            !popup.hidden &&
            !popup.contains(
                event.target
            ) &&
            !toggle.contains(
                event.target
            )
        ) {

            fermerPopup();

        }

    }
);


// =========================
// DÉCONNEXION
// =========================

const logoutButton =
    document.getElementById(
        'logout'
    );


if (logoutButton) {

    logoutButton.addEventListener(
        'click',
        () => {


            LB.ecrire(
                'connexion',
                false
            );


            location.href =
                'index.html';

        }
    );

}


// =========================
// PAGE ACTIVE
// =========================

const pageActuelle =
    location.pathname
        .split('/')
        .pop() ||
    'index.html';


for (
    const lien of
    document.querySelectorAll(
        '.navbar a[href]'
    )
) {

    if (
        lien.getAttribute(
            'href'
        ) === pageActuelle
    ) {

        lien.setAttribute(
            'aria-current',
            'page'
        );

    }

}