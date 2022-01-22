const cartDetailList = document.querySelector(".js-cart-detail-list");
const totalEl = document.querySelector(".js-total");
const cartList = JSON.parse(localStorage.getItem("addedProducts"));

let cartListItem,
  cartListItemImage,
  cartListItemName,
  cartListItemAmount,
  cartListItemPrice,
  cartListItemDeleteBtn;

let currency = "TL";

function renderCartList(data) {
  if (data.length === 0) {
    cartListEmptyControl();
  } else {
    data.forEach((product, index) => {
      const { url, name, price } = product;

      cartListItem = document.createElement("div");
      cartListItemImage = document.createElement("div");
      cartListItemName = document.createElement("div");
      cartListItemAmount = document.createElement("select");
      cartListItemPrice = document.createElement("div");
      cartListItemDeleteBtn = document.createElement("button");

      cartListItem.className = "cart-detail-item";
      cartListItemImage.className = "cart-detail-item-image";
      cartListItemName.className = "cart-detail-item-name";
      cartListItemPrice.className = "cart-detail-item-price";
      cartListItemDeleteBtn.className = "button-delete bi bi-x";

      cartListItemDeleteBtn.addEventListener("click", () => {
        cartListItemDelete(index);
      });

      cartListItemImage.innerHTML = `
      <div class="cart-detail-item-image">
          <img src="${url}" alt="${name}" />
      </div>
      `;

      cartListItemAmount.innerHTML = `
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
      `;

      cartListItemName.innerHTML = `
      <div class="cart-detail-item-name">${name}</div>
      `;

      cartListItemPrice.innerHTML = `
      <div class="cart-detail-item-price">${price} ${currency}</div>
      `;

      cartListItem.append(
        cartListItemImage,
        cartListItemName,
        cartListItemAmount,
        cartListItemPrice,
        cartListItemDeleteBtn
      );
      cartDetailList.append(cartListItem);
      selectProductAmount(cartListItemAmount, cartListItemPrice, price, index);
    });
  }
}

function selectProductAmount(amount, priceEl, price, index) {
  amount.addEventListener("change", (e) => {
    let selectedAmount = e.target.value;
    let calculatePrice = selectedAmount * price;
    priceEl.innerHTML = `${calculatePrice} ${currency}`;
    cartList[index].price = calculatePrice;
    totalMoney(cartList);
  });
}

function totalMoney(cartList) {
  let total = cartList.reduce((total, product) => total + product.price, 0);
  totalEl.innerHTML = `${total} ${currency}`;
}

function cartListEmptyControl() {
  cartDetailList.innerHTML = `
  <div class='text-center mb-5'>
    Sepetiniz boş! Lütfen <a href="index.html" class="fw-bold text-muted">ürünler</a> sayfasından bir ürün seçimi yapınız.
  </div>
  `;
}

function cartListItemDelete(product) {
  cartList.splice(product, 1);
  cartDetailList.innerHTML = "";
  localStorage.setItem("addedProducts", JSON.stringify(cartList));
  renderCartList(cartList);
  totalMoney(cartList);
  console.log(cartList);
}

renderCartList(cartList);
totalMoney(cartList);
