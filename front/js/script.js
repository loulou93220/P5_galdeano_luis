let url = "http://localhost:3000/api/products";
fetch(url)
  .then((response) => response.json())
  .then(function (data) {
    console.log(data);
    for (var a of data) {
      document.getElementById(
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
