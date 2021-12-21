function loadCart() {
  const sectionCart = document.getElementById("cart__items");
  let dataStock = JSON.parse(localStorage.getItem("data")) || [];
  let totalPrice = document.getElementById("totalPrice");
  let totalQuantity = document.getElementById("totalQuantity");
  let totalq = 0;
  let totalp = 0;
  for (let i = 0; i < dataStock.length; i++) {
    const product = dataStock[i];
    totalq += parseInt(product.quantity);
    totalp += product.quantity * product.price;

    if (totalq === 0) {
      alert("ATTENTION VOTRE PANIER EST VIDE");
    } else {
      totalPrice.innerHTML = totalp;
      totalQuantity.innerHTML = totalq;
    }

    sectionCart.innerHTML += `<article class="cart__item" data-id="{product-ID}">
      <div class="cart__item__img">
        <img src= ${product.imageUrl} alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${product.name} / ${product.color}</h2>
          <p>${product.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté :</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantity}>
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
  }
}
loadCart();

// #####>>>>> debut function de mise à jour des prix et quantités
function updatePriceAndQty() {
  let dataStock = JSON.parse(localStorage.getItem("data")) || [];
  let totalPrice = document.getElementById("totalPrice");
  let totalQuantity = document.getElementById("totalQuantity");
  let totalq = 0;
  let totalp = 0;
  console.log("TEXT");

  for (let i = 0; i < dataStock.length; i++) {
    const product = dataStock[i];
    console.log("TEXT" + product);

    totalq += parseInt(product.quantity);
    totalp += product.quantity * product.price;
  }
  if (totalq === 0) {
    totalPrice.innerHTML = totalp;
    totalQuantity.innerHTML = totalq;
    alert("ATTENTION VOTRE PANIER EST VIDE");
  } else {
    totalPrice.innerHTML = totalp;
    totalQuantity.innerHTML = totalq;
  }
}
// #####>>>>> fin function de mise à jour des prix et quantités

//ecoute de la quantité total = prix’
// ecoute de la quantité pour qté total + prix
function qtyListen() {
  let qtyInput = document.querySelectorAll(".itemQuantity"); // on recupere tout les input quantité
  // ecoute pour chaque element input
  qtyInput.forEach(function (input) {
    // pour chaque input quantité qu'on ecoute
    input.addEventListener("change", function (inputevent) {
      // à chaque changement dans l'input
      console.log(inputevent);
      let inputQty = parseInt(inputevent.target.value); // on recupere la valeur de l'input
      console.log(inputQty);
      // on recupere le nom du produit (nom du produit + couleur)
      const productName = input
        .closest("div.cart__item__content")
        .querySelector("div.cart__item__content__titlePrice > h2").innerText;
      // avec le nom du produit productName, on recupere l'index du produit dans le localstorage
      //let monIndexPanier = existingStorage.findIndex(item => item.name+' / '+item.color == productName); // on retrouve l'index

      //let existingStorage = JSON.parse(localStorage.getItem(productName)) || []; // on recupere le contenu du localstorage
      let existingStorage = JSON.parse(localStorage.getItem("data")) || [];
      const myproduct = existingStorage.findIndex(
        (item) => item.name + " / " + item.color == productName
      ); //on retrouve l'index
      let qty = localStorage.getItem("data");
      console.log(existingStorage[myproduct].quantity);

      existingStorage[myproduct].quantity = inputQty; // on écrase la quantité du produit du localstorage
      // injection qté dans localstorage
      localStorage.setItem("data", JSON.stringify(existingStorage)); // on écrase le produit du localstorage par lui même

      updatePriceAndQty(); //  #####>>>>> appel function de mise à jour des prix et quantités
    });
  });
  //loadCart();
}

qtyListen(); // on appel notre fonction

//----------------------------------------------------------------
// Suppression d'un article
//----------------------------------------------------------------
function deleteProduct() {
  let deleteLink = document.querySelectorAll(".deleteItem");
  //ecoute pour chaque lien supprimer
  deleteLink.forEach(function (input) {
    input.addEventListener("click", function () {
      //recuperation cle pour localstorage
      const productName = input
        .closest("div.cart__item__content")
        // .querySelector("div.cart__item__content__titlePrice").innerText; // ERREUR DANS LE QUERYSELECTOR #####>>>>>
        .querySelector("div.cart__item__content__titlePrice > h2").innerText;
      //suppression cle local storage
      console.log(productName);
      let existingStorage = JSON.parse(localStorage.getItem("data")) || [];
      const myproduct = existingStorage.findIndex(
        (item) => item.name + " / " + item.color == productName
      ); //on retrouve l'index
      console.log(myproduct);
      //localStorage.removeItem(myproduct);
      existingStorage.splice(myproduct, 1);
      localStorage.setItem("data", JSON.stringify(existingStorage));
      // suppression du noeud
      input.closest("div.cart__item__content").parentNode.remove();

      updatePriceAndQty(); // #####>>>>>appel function de mise à jour des prix et quantités
    });
  });
}
deleteProduct();

//----------------------------------------------------------------------
// Validation du formulaire avec test sur prénom nom adresse et ville
//----------------------------------------------------------------------
const buton = document.querySelector("#order");
buton.addEventListener("click", function () {
  console.log(firstName);
});

const validInput = function (input) {
  let inputRegExp = new RegExp("[a-zA-Z]$");
  let testInput = inputRegExp.test(input.value);

  let erreur = document.getElementById(input.getAttribute("name") + "ErrorMsg");
  if (testInput == false) {
    erreur.innerHTML = `<p>Saisie invalide</p>`;
    return false;
  } else {
    erreur.innerHTML = ``;
    return true;
  }
};
//-----------------------------------------------------------------------
//Validation adresse avec test
//-----------------------------------------------------------------------

const validaddress = function (input) {
  let erreur = document.getElementById(input.getAttribute("name") + "ErrorMsg");
  if (input.value == "") {
    erreur.innerHTML = `<p>Saisie invalide</p>`;
    return false;
  } else {
    erreur.innerHTML = ``;
    return true;
  }
};

//-----------------------------------------------------------------
//Validation Email avec test
//-----------------------------------------------------------------

const validemail = function (inputemail) {
  let emailRegExp = new RegExp(
    "^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$",
    "i"
  );
  let testemail = emailRegExp.test(inputemail.value);

  let erreur = document.getElementById("emailErrorMsg");
  if (testemail === false) {
    erreur.innerHTML = `<p>Email invalide</p>`;
    return false;
  } else {
    erreur.innerHTML = ``;
    return true;
  }
};

//------------------------------------------------------------
// Validation commande
//------------------------------------------------------------
function validation() {
  // ecoute du bouton commande

  let orderButton = document.getElementById("order");
  orderButton.addEventListener("click", function (event) {
    let form = document.querySelector(".cart__order__form");
    event.preventDefault();
    const firstName = document.querySelector("#firstName");

    const lastName = document.querySelector("#lastName");
    const city = document.querySelector("#city");
    const address = document.querySelector("#address");
    const email = document.querySelector("#email");

    let validFirstname = validInput(firstName);
    let validlastName = validInput(lastName);
    let validCity = validInput(city);
    let validAddress = validaddress(address);
    let validEmail = validemail(email);
    const validFormu =
      validFirstname &&
      validlastName &&
      validCity &&
      validaddress &&
      validEmail;
    if (localStorage.length !== 0) {
      let data = JSON.parse(localStorage.getItem("data")).id || [];
      // verification conditions regex
      if (validFormu) {
        console.log("bravo");
        // recuperation elements
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let address = document.getElementById("address").value;
        let city = document.getElementById("city").value;
        let email = document.getElementById("email").value;
        let formInfo = {
          firstName: firstName,
          lastName: lastName,
          address: address,
          city: city,
          email: email,
        };
        // recuperation formulaire validé + id des produits dans order
        console.log(data);
        console.log(formInfo);
        const order = {
          contact: formInfo,
          products: data,
        };
        console.log(order);
        // POST du formulaire client + id produits vers API
        const options = {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
        // envoie des informations commande vers la route order

        fetch("http://localhost:3000/api/products/order", options)
          .then((res) => res.json())
          .then(function (dataOrder) {
            //envoie vers la page confirmation avec id de la commande concaténé
            window.location.href = "confirmation.html?id=" + dataOrder.orderId;
          })
          .catch(function (err) {
            alert("error");
          });
      } else {
        event.preventDefault();
        console.log("formulaire mal rempli.");
      }
    } else {
      event.preventDefault();
      alert("Votre panier est vide.");
    }
  });
}

validation();
