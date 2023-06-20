const socket = io();

const createProductForm = document.getElementById("products-form");

createProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title-form").value;
  const description = document.getElementById("description-form").value;
  const category = document.getElementById("category-form").value;
  const price = document.getElementById("price-form").value;
  const code = document.getElementById("code-form").value;
  const stock = document.getElementById("stock-form").value;

  const newProduct = {
    title: title,
    description: description,
    category: category,
    price: price,
    code: code,
    stock: stock,
  };

  socket.emit("add-product", newProduct);
  createProductForm.reset();
});

const deleteProductForm = document.getElementById("delete-prod-form");

deleteProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const productId = document.getElementById("delete-button").value;
  //console.log(productId);
  socket.emit("delete-product", productId);
  deleteProductForm.reset();
});

socket.on("new-products-list", (newProductsList) => {
  //console.log(newProductsList);
  const productList = document.getElementById("dinamic-list-products");
  productList.innerHTML = "";
  newProductsList.forEach((product) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div>
      <p>ID:${product._id} </p>
      <p>Nombres:${product.title} </p>
      <p>Precio:${product.price} </p>
      <hr/>
    </div>
    `;
    productList.appendChild(div);
  });
});
