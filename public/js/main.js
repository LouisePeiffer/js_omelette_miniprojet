/** Créer un objet personne. Cette personne doit avoir des propriétés et des méthodes : 
* - nom(string)
* - lieu(string)
* - argent(number)
* - mainDroite(tableau)
* ( du coup main gauche(tableau))
* - seDeplacer(lieu)
* - payerArticle(article)
* - couper(ingredient, outil)
*/

let personne = {
    nom : "Louise",
    lieu : "Bruxelles",
    argent : 100,
    mainDroite : [],
    mainGauche: [],
    seDeplacer (x) {
        this.lieu = x.nom
        console.log(`${personne.nom} est actuellement à la ${personne.lieu}`);
    },
    payerArticle (x) {
        this.argent -= x.prix
        console.log(`Vous avez ${this.argent}`);
    },
    couper (x, y) {
        if (x.etat == "entier") {
            x.etat = "coupé"
            console.log(`Le ${y.nom} ${y.action} ${x.nom}`);
        }
    },
}

/**
* Créer un lieu "maison" (un objet) avec comme propriété "nom: 'maison'" et "personnes = []" => qui sera un tableau de personnes présentes dans la maison :
*/

let maison = {
    nom : "maison",
    personnes : [],
}

/**
* Créer un outil (couteau) pour découper les ingrédients achetés
* propriétés : nom et action.
* action a comme valeur l'état "coupé" (qui sera mis aux légumes lorsqu'ils seront coupés avec la méthode de "personne".)
*/

let couteau = {
    nom : "couteau",
    action :  "coupe",
}

/**
 * Créer des produits (ingrédients) à mettre dans le magasin qui serviront à créer l'omelette (oignon, oeuf, epice, fromage, ...);
 * propriétés : nom, etats ( entier,coupé, moulu), prix
 */

class Produits {
    constructor (nom, etat, prix) {
    this.nom = nom;
    this.etat = etat;
    this.prix = prix;
    }
}

let oignon = new Produits ("oignon", "coupe", 1);
let oeuf = new Produits ("oeuf", "entier", 2);
let epice = new Produits ("epice", "moulu", 3);
let fromage = new Produits ("fromage", "coupe", 4);
let bacon = new Produits ("bacon", "coupe", 5);


// Créer un lieu "epicerie" qui a comme propriétés :
// nom, personnes = [], paniers (un tableau d'objets "panier" avec une propriété "type" égal à panier et le contenu du panier, égal à un tableau vide),
let epicerie = {
    nom : "Marhaban",
    personnes : [],
    paniers : {
        type : "panier",
        contenu : [],
    },
    ingredou: [oignon, oeuf, epice,fromage,bacon],
}
// Les "ingrédients" créés juste au dessus contenus dans un tableau.
/**
 * Créer un poele avec un tableau comme contenu. Et avec une méthode cuir() qui, après 4 secondes, met l'état 'cuit' à this.contenu[0]. On peut faire ça avec la fonction setTimeout(()=> {}, 4000)
 */
let poele = {
    contenu : [],
    cuir () {
        setTimeout (()=> {
            this.contenu[0] = "cuit"
            console.log("L'omelette est faite");
        }, 4000)
    },
}
// Créer un bol avec un tableau comme contenu
// ajouter une méthode melanger(nomMelange) qui va créer un nouvel objet "newMelange" avec comme nom la variable nomMelange passé en paramètre et avec 'pas cuit' en etat. cette méthode remplacera this.contenu par [l'obj newMelange]
let bol = {
    contenu : [],
    melanger (nomMelange) {
        let newMelange = {
            nom : nomMelange,
            etat : "pas cuit",
        }
        this.contenu = newMelange
    },
}


/**** DEBUT DE L'OMELETTE ****/
// Pour dire que le personnage est à la maison :
personne.seDeplacer(maison)
console.log(maison);

// Avec l'objet personnage, utiliser la method seDeplacer et de passer en paramètre l'objet maison
// Afficher un message tel que :
// console.log(personnage.nom + " est actuellement à la " + personnage.lieu);

// Pour aller à l'épicerie acheter les ingrédients pour l'omelette, je répète la première étape en changeant le parametre de la method seDeplacer par l'epicerie
personne.seDeplacer(epicerie)
// Mon personnage prend un des paniers dans l'épicerie (il récupère le panier dans les objets de l'épicerie et le met dans sa main droite.)
// Il doit y avoir un objet dans la main droite de personnage et un panier en moins. Vérifier avec des console.log() ensuite afficher un message du type : 
personne.mainDroite.push(epicerie.paniers)
console.log(personne);
// console.log(`${personnage.nom} a pris un ${type du panier}`);
console.log(`${personne.nom} prend le ${epicerie.paniers.type}`);

// Je créer une boucle qui va prendre chaque élément (ingrédient) du contenu de l'épicerie (1 à 1) et en faire une COPIE dans le panier du personnage
// Afficher un message à chaque ingrédient pris
epicerie.ingredou.forEach(el => {
    personne.mainDroite[0].contenu.push(el);
    console.log(`${personne.nom} a pris ${el.nom}`);
});

// Payer chaque ingrédient récupéré dans le panier. Avec une boucle aussi, on va les passer 1 à 1 dans la fonction payerArticle()
// Afficher un message de ce qu'il reste d'argent sur le personnage.
personne.mainDroite[0].contenu.forEach(element => {
    personne.payerArticle(element);
});

// rentrer à la maison (comme ça on pourra cuisiner)
personne.seDeplacer(maison)
console.log(personne);
// mettre chaque ingrédient dans le bol (1 à 1 donc avec une boucle)
// Vérifier que les ingrédients ne se trouvent plus dans le panier (oups ! on a oublié de le rapporter x)
for (let i = 0; i < personne.mainDroite[0].contenu.length; i++) {
    bol.contenu.push(personne.mainDroite[0].contenu[i]);
    personne.mainDroite[0].contenu.splice(personne.mainDroite[0].contenu[i], 1);
    i--
}
// Afficher un petit message de chaque ingrédient qu'on met dans le bol.
// Retourner à l'épicerie pour rapporter le panier. (donc seDeplacer puis enlever le panier de la main droite et le remetre dans les paniers de l'épicerie.)
personne.seDeplacer(epicerie)
personne.mainDroite.splice(0)
console.log(personne);
// Afficher un petit message
console.log(`La main droite contient ${personne.mainDroite.length} éléments`);

// Retourner à la maison pour continuer l'omelette
// Afficher un petit message
personne.seDeplacer(maison)

// Vérifier chaque ingrédient dans le bol et le couper seulement s'il est entier ! Pour ça on utilise la méthode couper de personnage
personne.mainGauche.push(couteau);
console.log(personne.mainGauche);


bol.contenu.forEach(element => {
    personne.couper(element,couteau)
});

// Mélanger le contenu du bol avec la méthode melanger. on va nommer ce mélange une 'omelette' (à passer en param).
bol.melanger("omelette")
console.log(bol.contenu);
// Afficher un message avec le nouveau mélange
console.log(`Le bol contient une ${bol.contenu.nom}`);
// vider le contenu du bol dans la poele. Il ne doit plus rien avoir dans le bol et y avoir juste l'omelette pas cuite.
poele.contenu.push(bol.contenu)
console.log(poele);
console.log(`La poele contient ${poele.contenu[0].nom} ${poele.contenu[0].etat} `);

// Cuire l'omelette avec la méthode de la poele 
poele.cuir()

// Afficher un message final, notre omelette est cuite :)