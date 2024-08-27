function ready() {
    var removeBtnElement = document.getElementsByClassName('remove-btn');
    for(var i = 0; i < removeBtnElement.length; i++) {
        var button = removeBtnElement[i]
        button.addEventListener('click', removeFromCart)
    }

    var cartInputQuantityEl = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0; i < cartInputQuantityEl.length; i++) {
        var input = cartInputQuantityEl[i]
        input.addEventListener('change', cartInputQuantity)
    }

    var addToCartBtnEl = document.getElementsByClassName('add-to-cart');
    for(var i = 0; i < addToCartBtnEl.length; i++) {
        var addToCartBtn = addToCartBtnEl[i]
        addToCartBtn.addEventListener('click', addItemToCartCLicked)
    }

    var PurchaseBtn = document.getElementsByClassName('purchase-btn')[0];
    PurchaseBtn.addEventListener('click', PurchaseBtnClicked)

    updateTotal();
}

function PurchaseBtnClicked() {
    alert("Thanks for shopping with Shop Pano")
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateTotal()
}

function removeFromCart(event) {
    var removeBtnClicked = event.target
    removeBtnClicked.parentElement.parentElement.parentElement.remove();
    updateTotal();
}

function cartInputQuantity(event) {
    var input = event.target
    if(isNaN(input.value) || input.value <= 0 ) {
        input.value = 1
    } else {
        input.value;
    }
    updateTotal();
}

function addItemToCartCLicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title =shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price =shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imgScr =shopItem.getElementsByClassName('shop-item-img')[0].src;
    console.log(title, price, imgScr);
    addToCart(title, price, imgScr);
}

function addToCart(title, price, imgScr) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemName = cartItems.getElementsByClassName('cart-item-title');
    for(var i = 0; i < cartItemName.length; i++) {
        if(cartItemName[i].innerText == title) {
            alert("This Item is already in your cart.");
            return
        } 
    }

    var cartRowContent = `
                    <div class="cart-column cart-item">
                        <img src="${imgScr}" class="cart-item-img" width="30px">
                        <span class="cart-item-title">${title}</span>
                    </div>
                    <span class="cart-item-price">${price}</span>
                    <div class="cart-quantity">
                        <input type="number" value="1" class="cart-quantity-input" width="100">
                        <button class="remove-btn"><i class="fa fa-trash-alt"></i></button>
                    </div>`
                    cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeFromCart)
    updateTotal()
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', cartInputQuantity)
    updateTotal()
}

function updateTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceEl = cartRow.getElementsByClassName('cart-item-price')[0]
        var quantityInput = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceEl.innerText.replace(`$`, ``));
        var quantity = quantityInput.value;
        total = total + (price * quantity);
    }

    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('cart-item-total-price')[0].innerText = `$` + total;
}

ready();