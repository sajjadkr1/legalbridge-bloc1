'use strict';


// =========================
// OUVERTURE DE LA RECHERCHE
// =========================

const openSearchButton =
    document.getElementById(
        'open-search'
    );


const searchSection =
    document.getElementById(
        'search'
    );


const problemeSelect =
    document.getElementById(
        'probleme'
    );

if (openSearchButton && searchSection && problemeSelect) {
openSearchButton.addEventListener(
    'click',
    () => {


        // Affiche la section de recherche
        searchSection.hidden =
            false;


        // Met à jour l'état du bouton
        openSearchButton.setAttribute(
            'aria-expanded',
            'true'
        );


        // Fait défiler la page
        // jusqu'à la recherche
        searchSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });


        // Place le focus
        // sur le premier champ
        problemeSelect.focus({
            preventScroll: true
        });

    }
);
}