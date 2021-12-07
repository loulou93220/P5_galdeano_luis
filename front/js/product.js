let params = new URL(document.location).searchParams;
let id = params.get("id");

let url = "http://localhost:3000/api/products/" + [id];
fetch(url)
  .then((response) => response.json())
  .then(function (data) {
    console.table(data);

    document.querySelector("#title").innerHTML = data.name;
    document.querySelector("#price").innerHTML = data.price;
    document.querySelector("#description").innerHTML = data.description;

    let imagesrc = data.imageUrl;
    document.getElementById("imageproduit").src = imagesrc;

    let mycolor = document.getElementById("colors");
    for (color in data.colors) {
      mycolor.options[mycolor.options.length] = new Option(
        data.colors[color],
        data.colors[color]
      );
    }
  });

let id_produit = new URL(window.location).searchParams.get("id"); // on recup l'id du produit dans l'url
var local = "http://localhost:3000/api/products/"; // on declare l'url de l'api

async function ecouteAjoutPanier() {
  // fonction qui ecoute l'evenement click sur le bouton ajouter au panier
  var prod = await fetch(local + id_produit); // on concataine les 2
  var produ = await prod.json(); // on recup le canape au format json
  const AJOUT_PANIER = document.querySelector("#addToCart"); // on recup le bouton ajoputer au panier
  AJOUT_PANIER.addEventListener("click", function (e) {
    const productQuantity = document.getElementById("quantity");
    const productColors = document.getElementById("colors");
    let indexChoise = productColors.selectedIndex;
    let choiseValue = productColors.options[indexChoise].value;
    let Val = productQuantity.value;
    const stock = {
      id: produ._id,
      name: produ.name,
      color: choiseValue,
      quantity: Val,
      imageUrl: produ.imageUrl,
      price: produ.price,
    };
    console.log(stock.color);
    //Ajout de l'objet stock au parametre de la fonction "ajouterAuPanier"
    ajouterAuPanier(stock);
  });
}

ecouteAjoutPanier(); // appel à la fonction d'ecoute d'ajout au panier

// Ajoute les données dans le localstorage relié avec "AJOUT_PANIER.addEventListener"
function ajouterAuPanier(stock) {
  // récupération des données dans le localstorage
  let existingStorage = JSON.parse(localStorage.getItem("data")) || []; // on recupere le contenu du localstorage ou a defaut un tableau vide
  // A.M DEBUT
  const myproduct = existingStorage.find(
    (item) => item.id == stock.id && item.color == stock.color
  );

  if (myproduct != null) {
    let stockqty = 0; // existe deja dans le localstorage avec la même couleur
    let itemqty = 0;
    stockqty = parseInt(stock.quantity); // existe deja dans le localstorage avec la même couleur
    itemqty = parseInt(myproduct.quantity);

    myproduct.quantity = stockqty + itemqty; // si c'est le cas on additionne l'ancienne quantité pour ce produit et la nouvelle quantité
    localStorage.setItem("data", JSON.stringify(existingStorage)); // puis on ecrase ce produit avec sa nouvelle quantité
  } else {
    existingStorage.push(stock);
    localStorage.setItem("data", JSON.stringify(existingStorage));
  }
  console.log(stock);
}
