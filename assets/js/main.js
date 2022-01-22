const productWrapper = document.querySelector(".js-products");
const shoppingCartBtn = document.querySelector(".js-shopping-cart-btn");
const shoppingCart = document.querySelector(".js-shopping-cart");
const shoppingCartAmount = document.querySelector(".js-shopping-cart-amount");
const shoppingCartListWrapper = document.querySelector(
  ".js-shopping-cart-list"
);
const products = [
  {
    url: "assets/img/products/apple-airpods-pro.png",
    name: "AirPods Pro",
    price: 2.899,
    brief: [
      "Apple tarafından tasarlandı",
      "Aktif Gürültü Engelleme",
      "Daha da kişiye özel kullanım rahatlığı ve yalıtım",
      "Şeffaf Mod",
      "Dinamik kafa izleme özellikli uzamsal ses²",
      "Adaptif EQ özelliğine sahip muhteşem ses performansı",
    ],
  },
  {
    url: "assets/img/products/apple-airpods-max.png",
    name: "AirPods Max",
    price: 5.599,
    brief: [
      "Kusursuz bir Uyum için Kusursuz bir Tasarım",
      `
    Ağ örgülü taç kısmı ve akustik kriterler düşünülerek
    tasarlanmış hafızalı köpük özelliğine sahip kulaklık
    yastıkları.`,
      `
      Yükses Ses Kalitesi Apple tasarımı sürücü, duyulabilir frekans
      aralığında son derece düşük distorsiyonla yüksek kaliteli ses
      sağlıyor.
      `,
    ],
  },
  {
    url: "assets/img/products/apple-airpods-max-gray.png",
    name: "AirPods Max Gri",
    price: 5.599,
    brief: [
      "Kusursuz bir Uyum için Kusursuz bir Tasarım",
      `
    Ağ örgülü taç kısmı ve akustik kriterler düşünülerek
    tasarlanmış hafızalı köpük özelliğine sahip kulaklık
    yastıkları.`,
      `
      Yükses Ses Kalitesi Apple tasarımı sürücü, duyulabilir frekans
      aralığında son derece düşük distorsiyonla yüksek kaliteli ses
      sağlıyor.
      `,
    ],
  },
];

let shoppingCartList = [];

let currency = "TL";

function renderProducts() {
  let productEl = "";

  products.forEach((product, index) => {
    const { url, name, price, brief } = product;
    let briefEl = "";

    brief.forEach((item) => {
      briefEl += `
         <p>${item}</p>
        `;
    });

    productEl += `
    <div class="swiper-slide">
        <div class="product">
            <div class="product-image">
                <img
                src="${url}"
                alt="${name}"
                />
            </div>
            <div class="product-content">
                <div class="product-name">${name}</div>
                ${briefEl}
                <div class="product-price">${price} ${currency}</div>
                <button type="button" class="button-primary mt-4 mx-auto mx-lg-0" onclick="addProductBasket(${index});" >Sepete Ekle</button>
            </div>
        </div>
    </div>
    `;
  });

  productWrapper.innerHTML = productEl;
}

function productSlider() {
  var swiper = new Swiper(".products-slider", {
    slidesPerView: 1,
    pagination: {
      el: ".products-slider-pagination",
      clickable: true,
    },
  });
}

function shoppingCartListEmptyControl() {
  if (shoppingCartList.length === 0) {
    shoppingCartListWrapper.innerHTML = `<div class="text-center">Sepetiniz boş!</div>`;
  }
}

function shoppingCartListLengtCount() {
  if (shoppingCartList.length >= 0) {
    shoppingCart.classList.add("active");
    shoppingCartAmount.innerHTML = shoppingCartList.length;
  }
}

function addProductBasket(product) {
  let addedProduct = products[product];
  if (!shoppingCartList.includes(addedProduct)) {
    shoppingCartList.push(addedProduct);
  }
  renderShoppingCartList();
  addedProductLocalStorage();
  shoppingCartListLengtCount();
}

function showShoppingCart() {
  shoppingCartListEmptyControl();
  shoppingCartBtn.classList.toggle("bi-x-lg");
  shoppingCart.classList.toggle("show");
}

function renderShoppingCartList() {
  let shoppingCartListEl = "";
  shoppingCartList.forEach((item, index) => {
    const { url, name, price } = item;

    shoppingCartListEl += `
    <div class="shopping-cart-list-item">
        <img
        src="${url}"
        class="shopping-cart-list-item-image"
        alt="${name}"
        />
        <div class="shopping-cart-list-item-name">${name}</div>
        <div class="shopping-cart-list-item-price">${price} ${currency}</div>
        <button type="button" class="button-delete bi bi-x" onclick="deleteShoppingCartListItem(${index});"></button>
    </div>
    `;
  });
  shoppingCartListWrapper.innerHTML = shoppingCartListEl;
}

function renderShoppingCartListLocalStorage() {
  let products = JSON.parse(localStorage.getItem("addedProducts"));
  if (products !== null) {
    shoppingCartList = products;
    renderShoppingCartList();
    shoppingCartListLengtCount();
  }
}

function deleteShoppingCartListItem(product) {
  shoppingCartList.splice(product, 1);
  renderShoppingCartList();
  shoppingCartListLengtCount();
  shoppingCartListEmptyControl();
  addedProductLocalStorage();
}

function addedProductLocalStorage() {
  localStorage.setItem("addedProducts", JSON.stringify(shoppingCartList));
}

function domControl() {
  if (productWrapper !== null) {
    renderProducts();
    productSlider();
  }
}

shoppingCartBtn.addEventListener("click", showShoppingCart);

domControl();
renderShoppingCartListLocalStorage();
