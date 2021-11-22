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
    sectionCart.innerHTML += `<article class="cart__item" data-id="{product-ID}">
      <div class="cart__item__img">
        <img src= ${product.imageUrl} alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${product.name}</h2>
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

    if (totalq === 0) {
      alert("ATTENTION VOTRE PANIER EST VIDE")
    }
    else {

      totalPrice.innerHTML = totalp;
      totalQuantity.innerHTML = totalq;

      console.log(totalq);
    }
    }
}
loadCart();

// Suppression d'un article
function deleteProduct() {
  let deleteLink = document.querySelectorAll(".deleteItem");
  //ecoute pour chaque lien supprimer
  deleteLink.forEach(function (input) {
    input.addEventListener("click", function () {
      //recuperation cle pour localstorage
      const productName = input
        .closest("div.cart__item__content")
        .querySelector("div.cart__item__content__titlePrice").innerText;
      //suppression cle local storage

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
      window.location.reload();
      loadCart(); // on recalcul les prix total et quantité total
    });
  });
}
deleteProduct();
