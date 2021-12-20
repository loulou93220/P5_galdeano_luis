let url = "http://localhost:3000/api/products"; //Adresse API
fetch(url)  //Fonction d'appel javascript de l'API
  .then((response) => response.json()) //Récupération des données API en Array puis transformation en JSON
  .then(function (data) {
    console.log(data); // Vérification des données sur la console
    for (var a of data) {
      document.getElementById(  // Envoie des produit sur la page HTML via son ID
        "items"
      ).innerHTML += `<a href="./product.html?id=${a._id}"> 
      <article>
        <img src = ${a.imageUrl} alt="Lorem ipsum dolor sit amet, Kanap name1">
        <h3 class="productName">${a.name}</h3>
        <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
      </article>
    </a>`;
    }
  });
