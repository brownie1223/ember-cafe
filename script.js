const cart = [];

const cartCount = document.getElementById("cart-count");
const addButtons = document.querySelectorAll(".add-cart");

const cartButton = document.querySelector(".cart-button");
const cartPanel = document.getElementById("cart-panel");
const cartOverlay = document.getElementById("cart-overlay");
const closeCart = document.getElementById("close-cart");

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

const checkoutButton = document.getElementById("checkout");
const checkoutPanel = document.getElementById("checkout-panel");
const closeCheckout = document.getElementById("close-checkout");

const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");

const finishOrder = document.getElementById("finish-order");


function updateCart() {

    const totalItems = cart.reduce(
        (total, product) => total + product.quantity,
        0
    );

    cartCount.textContent = totalItems;

    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach((product, index) => {

        total += product.price * product.quantity;

        const item = document.createElement("div");

        item.classList.add("cart-item");

        item.innerHTML = `
            <div>
                <strong>${product.name}</strong>

                <p>
                    R$ ${product.price.toFixed(2).replace(".", ",")} cada
                </p>

                <div class="quantity-controls">

                    <button
                        class="quantity-minus"
                        data-index="${index}"
                    >
                        −
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button
                        class="quantity-plus"
                        data-index="${index}"
                    >
                        +
                    </button>

                </div>
            </div>

            <strong>
                R$ ${(product.price * product.quantity)
                    .toFixed(2)
                    .replace(".", ",")}
            </strong>
        `;

        cartItems.appendChild(item);

    });


    cartTotal.textContent =
        `R$ ${total.toFixed(2).replace(".", ",")}`;


    document.querySelectorAll(".quantity-minus").forEach(button => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            cart[index].quantity--;

            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }

            updateCart();

        });

    });


    document.querySelectorAll(".quantity-plus").forEach(button => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            cart[index].quantity++;

            updateCart();

        });

    });

}


addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingProduct = cart.find(
            product => product.name === name
        );


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }


        updateCart();

        button.textContent = "Adicionado ✓";

        setTimeout(() => {
            button.textContent = "Adicionar";
        }, 1200);

    });

});


cartButton.addEventListener("click", () => {

    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");

});


function closeCartPanel() {

    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");

}


closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);

function updateCheckout() {

    checkoutItems.innerHTML = "";

    let total = 0;

    cart.forEach(product => {

        const subtotal = product.price * product.quantity;

        total += subtotal;

        const item = document.createElement("div");

        item.classList.add("checkout-item");

        item.innerHTML = `
            <span>
                ${product.name} × ${product.quantity}
            </span>

            <strong>
                R$ ${subtotal.toFixed(2).replace(".", ",")}
            </strong>
        `;

        checkoutItems.appendChild(item);

    });

    checkoutTotal.textContent =
        `R$ ${total.toFixed(2).replace(".", ",")}`;
}


checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    updateCheckout();

    checkoutPanel.classList.add("active");

});


closeCheckout.addEventListener("click", () => {

    checkoutPanel.classList.remove("active");

});


finishOrder.addEventListener("click", () => {

    const name = document.querySelector(
        '.checkout-form input[type="text"]'
    );

    const email = document.querySelector(
        '.checkout-form input[type="email"]'
    );

    const address = document.querySelector(
        '.checkout-form input[placeholder="Rua, número"]'
    );


    if (
        name.value.trim() === "" ||
        email.value.trim() === "" ||
        address.value.trim() === ""
    ) {

        alert("Preencha todos os campos antes de continuar.");

        return;
    }


    alert("Pedido demonstrativo realizado! ☕");


    // Limpa o carrinho
    cart.length = 0;

    updateCart();


    // Fecha o checkout
    checkoutPanel.classList.remove("active");


    // Fecha o carrinho
    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");


    // Limpa os campos
    name.value = "";
    email.value = "";
    address.value = "";

});
