
let randerData = document.querySelector(".randerData");
let allData = [];
let totalPrice = 0; 
let totalPriceElement = document.createElement('p'); 
totalPriceElement.setAttribute('class', 'totalPrice');
totalPriceElement.innerText = `Total Price: $${totalPrice}`;


let container = document.querySelector('.mains'); 
container.insertBefore(totalPriceElement, randerData); 
async function getData() {
  try {
    const res = await fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    );
    const data = await res.json();
    allData = data.categories;
    displayAllData();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function createProductCard(product) {
    let productCard = document.createElement('div');
    productCard.setAttribute('class', 'product-card');

    let createImgElm = document.createElement("img");
    createImgElm.setAttribute("src", product.image);
    createImgElm.setAttribute("class", "myImage");
    productCard.appendChild(createImgElm);

    let createTitle = document.createElement("p");
    let createTextTitle = document.createTextNode(`Name: ${product.title}`);
    createTitle.appendChild(createTextTitle);
    createTitle.setAttribute('class', 'myName');
    productCard.appendChild(createTitle);

    let createPrice = document.createElement("p");
    let createPriceElm = document.createTextNode(`Price: $${product.price}`);
    createPrice.appendChild(createPriceElm);
    productCard.appendChild(createPrice);

    let addCardButton = document.createElement('button');
    addCardButton.setAttribute('class', 'addCardbtn');
    addCardButton.innerText = 'Add to Cart';
    addCardButton.onclick = () => {
        alert(`Added ${product.title} to cart`);
        totalPrice += product.price; 
        totalPriceElement.innerText = `Total Price: $${totalPrice}`; 
    };
    productCard.appendChild(addCardButton);

    randerData.appendChild(productCard);
}

function displayAllData() {
  randerData.innerHTML = '';
  allData.forEach((category) => {
    category.category_products.forEach((product) => {
      createProductCard(product);
    });
  });
}

function filterData(categoryName) {
  randerData.innerHTML = '';
  const filteredCategory = allData.find(category => category.category_name === categoryName);
  if (filteredCategory) {
    filteredCategory.category_products.forEach((product) => {
      createProductCard(product);
    });
  }
}

function searchProducts(searchTerm) {
  randerData.innerHTML = '';
  allData.forEach((category) => {
    category.category_products
      .filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .forEach((product) => {
        createProductCard(product);
      });
  });
}

getData();
