const socket = io();

//function add product -> no reload / submit / title.value, etc /
//emit object

//consumir productList

async function addProduct() {
  let product = {
    thumbnail: document.querySelector("#thumbnail").value,
    title: document.querySelector("#title").value,
    description: document.querySelector("#description").value,
    price: document.querySelector("#price").value,
    code: document.querySelector("#code").value,
    stock: document.querySelector("#stock").value,
  };

  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Success:", data);
    socket.emit("updateProductList", data.products);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function deleteProduct(productId) {
  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Success:", data);
    socket.emit("updateProductList", data.products);
  } catch (error) {
    console.error("Error:", error);
  }
}

document.querySelector("#addProduct").addEventListener("click", (event) => {
  event.preventDefault();
  addProduct();
});

document.querySelectorAll(".deleteProduct").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    let productId = event.target.dataset.productId;
    deleteProduct(productId);
  });
});

socket.on("updateProductList", (productList) => {
  console.log("here");
  let productListContainer = document.querySelector("#productListContainer");

  productListContainer.innerHTML = "";

  productList.forEach((product) => {
    let productElement = document.createElement("div");
    let ulElement = document.createElement("ul");

    let thumbnailLi = document.createElement("li");
    thumbnailLi.textContent = product.thumbnail;
    ulElement.appendChild(thumbnailLi);

    let titleLi = document.createElement("li");
    titleLi.textContent = `Product: ${product.title}`;
    ulElement.appendChild(titleLi);

    let descriptionLi = document.createElement("li");
    descriptionLi.textContent = `Description: ${product.description}`;
    ulElement.appendChild(descriptionLi);

    let priceLi = document.createElement("li");
    priceLi.textContent = `Price: ${product.price}`;
    ulElement.appendChild(priceLi);

    let codeLi = document.createElement("li");
    codeLi.textContent = `Product Code: ${product.code}`;
    ulElement.appendChild(codeLi);

    let stockLi = document.createElement("li");
    stockLi.textContent = `Available Qty: ${product.stock}`;
    ulElement.appendChild(stockLi);

    productElement.appendChild(ulElement);

    let updateButton = document.createElement("button");
    updateButton.id = "update";
    updateButton.type = "submit";
    updateButton.textContent = "Update Product";
    productElement.appendChild(updateButton);

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteProduct");
    deleteButton.type = "submit";
    deleteButton.dataset.productId = product.id;
    deleteButton.textContent = `Delete Product ${product.id}`;
    deleteButton.addEventListener("click", (event) => { // Attach event listener
        event.preventDefault();
        let productId = event.target.dataset.productId;
        deleteProduct(productId);
      });
      productElement.appendChild(deleteButton);

    productListContainer.appendChild(productElement);
  });
});


