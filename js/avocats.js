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
// PARAMÈTRES DE RECHERCHE
// =========================

const params =
    new URLSearchParams(
        location.search
    );


const specialite =
    params.get('specialite') || '';


const ville =
    params.get('ville') || '';


// =========================
// REMPLIR LES CHAMPS
// =========================

document.getElementById(
    'specialite'
).value = specialite;


document.getElementById(
    'ville'
).value = ville;


// =========================
// FILTRER LES AVOCATS
// =========================

const resultats =
    window.LEGALBRIDGE_AVOCATS.filter(
        avocat => {

            const specialiteCorrespond =
                !specialite ||
                LB.normaliser(
                    avocat.specialite
                ) ===
                LB.normaliser(
                    specialite
                );


            const villeCorrespond =
                !ville ||
                LB.normaliser(
                    avocat.ville
                ).includes(
                    LB.normaliser(
                        ville
                    )
                );


            return (
                specialiteCorrespond &&
                villeCorrespond
            );

        }
    );


// =========================
// NOMBRE DE RÉSULTATS
// =========================

const resultCount =
    document.getElementById(
        'result-count'
    );


if (resultats.length === 0) {

    resultCount.textContent =
        'Aucun avocat trouvé';

} else if (resultats.length === 1) {

    resultCount.textContent =
        '1 avocat trouvé';

} else {

    resultCount.textContent =
        resultats.length +
        ' avocats trouvés';

}


// =========================
// MESSAGE AUCUN RÉSULTAT
// =========================

document.getElementById(
    'empty'
).hidden =
    resultats.length !== 0;


// =========================
// AFFICHAGE DES AVOCATS
// =========================

document.getElementById(
    'resultats'
).innerHTML =
    resultats
        .map(
            avocat => {

                const specialiteAffichee =
                    specialites[
                        avocat.specialite
                    ] ||
                    avocat.specialite;


                return `
                    <article class="card">

                        <img
                            src="${LB.texte(avocat.img)}"
                            alt="Photo de ${LB.texte(avocat.nom)}"
                            class="avocat-image"
                            loading="lazy"
                        >


                        <h2>
                            ${LB.texte(avocat.nom)}
                        </h2>


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


                        <a
                            href="avocat.html?id=${avocat.id}"
                        >
                            Voir les informations
                        </a>

                    </article>
                `;

            }
        )
        .join('');