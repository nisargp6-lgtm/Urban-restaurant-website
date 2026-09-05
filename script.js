"use strict";

/*
    URBAN ROOFTOP RESTAURANT

    IMPORTANT SECURITY RULE:

    This frontend is NOT trusted.

    The browser can modify:
    - localStorage
    - JavaScript
    - displayed prices
    - quantities

    Therefore, the production backend MUST:
    - authenticate the customer
    - authorize order access
    - validate product IDs
    - load prices from the database
    - recalculate totals
    - never trust totals sent by the browser
    - never use a URL parameter as proof of ownership
*/


/* =========================================================
   PRODUCT CATALOG
   ========================================================= */

const PRODUCTS = [
    {
        id: "starter-bruschetta",
        name: "Classic Bruschetta",
        category: "starters",
        categoryName: "Starters",
        price: 249,
        type: "veg",
        description:
            "Toasted Italian bread topped with tomatoes, basil, garlic and olive oil.",
        image:
            "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: "starter-paneer",
        name: "Urban Paneer Tikka",
        category: "starters",
        categoryName: "Starters",
        price: 329,
        type: "veg",
        description:
            "Charred paneer with peppers, onions and aromatic Indian spices.",
        image:
            "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d4?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: "starter-spring-rolls",
        name: "Crispy Spring Rolls",
        category: "starters",
        categoryName: "Starters",
        price: 229,
        type: "veg",
        description:
            "Golden rolls filled with fresh vegetables and served with a spicy dip.",
        image:
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: "pizza-margherita",
        name: "Truffle Margherita",
        category: "pizza",
        categoryName: "Pizza & Pasta",
        price: 499,
        type: "veg",
        description:
            "Wood-fired pizza with mozzarella, basil, tomato and truffle oil.",
        image:
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: "pizza-pepperoni",
        name: "Urban Pepperoni",
        category: "pizza",
        categoryName: "Pizza & Pasta",
        price: 599,
        type: "nonveg",
        description:
            "Classic pizza with pepperoni, mozzarella and signature tomato sauce.",
        image:
            "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: "pasta-alfredo",
        name: "Creamy Alfredo Pasta",
        category: "pizza",
        categoryName: "Pizza & Pasta",
        price: 399,
        type: "veg",
        description:
            "Homemade pasta tossed in creamy parmesan and garlic sauce.",
        image:
            "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: "pasta-arrabbiata",
        name: "Spicy Arrabbiata",
        category: "pizza",
        categoryName: "Pizza & Pasta",
        price: 379,
        type: "veg",
        description:
            "Pasta in a rich tomato sauce with garlic, chilli and herbs.",
        image:
            "https://images.unsplash.com/photo-1598866594230-a7c12756260f?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: "main-butter-chicken",
        name: "Urban Butter Chicken",
        category: "main",
        categoryName: "Main Course",
        price: 549,
        type: "nonveg",
        description:
            "Tender chicken in a rich, creamy tomato and butter gravy.",
        image:
            "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: "main-paneer-curry",
        name: "Royal Paneer Curry",
        category: "main",
        categoryName: "Main Course",
        price: 449,
        type: "veg",
        description:
            "Soft paneer cubes cooked in a rich Indian gravy with aromatic spices.",
        image:
            "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: "main-steak",
        name: "Grilled Herb Steak",
        category: "main",
        categoryName: "Main Course",
        price: 799,
        type: "nonveg",
        description:
            "Tender grilled steak with seasonal vegetables and house sauce.",
        image:
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: "main-biryani",
        name: "Urban Veg Biryani",
        category: "main",
        categoryName: "Main Course",
        price: 399,
        type: "veg",
        description:
            "Fragrant basmati rice, vegetables, saffron and signature spices.",
        image:
            "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: "dessert-lava",
        name: "Chocolate Lava Cake",
        category: "desserts",
        categoryName: "Desserts",
        price: 249,
        type: "veg",
        description:
            "Warm chocolate cake with a rich molten centre and vanilla ice cream.",
        image:
            "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: "dessert-cheesecake",
        name: "New York Cheesecake",
        category: "desserts",
        categoryName: "Desserts",
        price: 279,
        type: "veg",
        description:
            "Creamy baked cheesecake with a crisp biscuit base.",
        image:
            "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: "dessert-tiramisu",
        name: "Classic Tiramisu",
        category: "desserts",
        categoryName: "Desserts",
        price: 299,
        type: "veg",
        description:
            "Espresso-soaked sponge layered with mascarpone and cocoa.",
        image:
            "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: "drink-mint",
        name: "Sunset Mint Cooler",
        category: "drinks",
        categoryName: "Drinks",
        price: 199,
        type: "veg",
        description:
            "Refreshing mint, lime and sparkling water served ice cold.",
        image:
            "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: "drink-coffee",
        name: "Urban Cappuccino",
        category: "drinks",
        categoryName: "Drinks",
        price: 179,
        type: "veg",
        description:
            "Smooth espresso topped with silky steamed milk foam.",
        image:
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: "drink-berry",
        name: "Berry Cooler",
        category: "drinks",
        categoryName: "Drinks",
        price: 229,
        type: "veg",
        description:
            "Fresh berries, lime and sparkling water with crushed ice.",
        image:
            "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=85"
    }
];


/* =========================================================
   STATE
   ========================================================= */

let selectedCategory = "all";
let searchQuery = "";

const CART_STORAGE_KEY = "urban_rooftop_cart_v2";

let cart = loadCart();


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const menuGrid = document.getElementById("menuGrid");
const emptyMenu = document.getElementById("emptyMenu");
const menuSearch = document.getElementById("menuSearch");
const categoryTabs = document.getElementById("categoryTabs");

const cartCount = document.getElementById("cartCount");
const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartOverlay = document.getElementById("cartOverlay");
const cartDrawer = document.getElementById("cartDrawer");
const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartSummary = document.getElementById("cartSummary");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartDelivery = document.getElementById("cartDelivery");
const cartTotal = document.getElementById("cartTotal");
const browseMenuBtn = document.getElementById("browseMenuBtn");

const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckoutBtn = document.getElementById("closeCheckoutBtn");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutMessage = document.getElementById("checkoutMessage");

const orderType = document.getElementById("orderType");
const addressGroup = document.getElementById("addressGroup");
const customerAddress = document.getElementById("customerAddress");

const placeOrderBtn = document.getElementById("placeOrderBtn");

const successModal = document.getElementById("successModal");
const successMessage = document.getElementById("successMessage");
const closeSuccessBtn = document.getElementById("closeSuccessBtn");

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");

const reservationForm = document.getElementById("reservationForm");


/* =========================================================
   HELPERS
   ========================================================= */

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(amount);
}


function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = String(value);
    return div.innerHTML;
}


/* =========================================================
   PRODUCT HELPERS
   ========================================================= */

function getProduct(productId) {
    return PRODUCTS.find(product => product.id === productId);
}


function getCartEntries() {
    return Object.entries(cart)
        .map(([productId, quantity]) => ({
            product: getProduct(productId),
            quantity
        }))
        .filter(item => item.product);
}


function getCartItemCount() {
    return getCartEntries().reduce(
        (total, item) => total + item.quantity,
        0
    );
}


function getCartSubtotal() {
    return getCartEntries().reduce(
        (total, item) =>
            total + item.product.price * item.quantity,
        0
    );
}


function getDeliveryFee() {
    if (getCartItemCount() === 0) {
        return 0;
    }

    if (orderType.value === "pickup") {
        return 0;
    }

    return 49;
}


/* =========================================================
   LOCAL CART
   ========================================================= */

function loadCart() {
    try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);

        if (!saved) {
            return {};
        }

        const parsed = JSON.parse(saved);

        if (
            typeof parsed !== "object" ||
            parsed === null ||
            Array.isArray(parsed)
        ) {
            return {};
        }

        const cleanCart = {};

        for (const [productId, quantity] of Object.entries(parsed)) {

            const productExists = PRODUCTS.some(
                product => product.id === productId
            );

            const safeQuantity = Number.parseInt(quantity, 10);

            if (
                productExists &&
                Number.isInteger(safeQuantity) &&
                safeQuantity > 0 &&
                safeQuantity <= 50
            ) {
                cleanCart[productId] = safeQuantity;
            }
        }

        return cleanCart;

    } catch {
        return {};
    }
}


function saveCart() {
    try {
        localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cart)
        );
    } catch {
        // Storage may be unavailable in private/restricted browsers.
    }
}


/* =========================================================
   MENU RENDER
   ========================================================= */

function renderMenu() {

    const normalizedSearch =
        searchQuery.trim().toLowerCase();

    const filteredProducts =
        PRODUCTS.filter(product => {

            const categoryMatch =
                selectedCategory === "all" ||
                product.category === selectedCategory;

            const searchMatch =
                !normalizedSearch ||
                product.name.toLowerCase().includes(normalizedSearch) ||
                product.description
                    .toLowerCase()
                    .includes(normalizedSearch) ||
                product.categoryName
                    .toLowerCase()
                    .includes(normalizedSearch);

            return categoryMatch && searchMatch;
        });


    menuGrid.replaceChildren();


    filteredProducts.forEach(product => {

        const article =
            document.createElement("article");

        article.className = "menu-card";


        const imageWrap =
            document.createElement("div");

        imageWrap.className =
            "menu-card-image-wrap";


        const image =
            document.createElement("img");

        image.className =
            "menu-card-image";

        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";


        const body =
            document.createElement("div");

        body.className =
            "menu-card-body";


        const titleRow =
            document.createElement("div");

        titleRow.className =
            "menu-card-title";


        const title =
            document.createElement("h3");

        title.textContent =
            product.name;


        const price =
            document.createElement("span");

        price.className =
            "menu-price";

        price.textContent =
            formatCurrency(product.price);


        titleRow.append(
            title,
            price
        );


        const description =
            document.createElement("p");

        description.className =
            "menu-description";

        description.textContent =
            product.description;


        const meta =
            document.createElement("div");

        meta.className =
            "menu-meta";


        const badge =
            document.createElement("span");

        badge.className =
            product.type === "nonveg"
                ? "menu-badge nonveg"
                : "menu-badge";

        badge.textContent =
            product.type === "nonveg"
                ? "NON-VEG"
                : "VEG";


        const addButton =
            document.createElement("button");

        addButton.className =
            "add-button";

        addButton.type =
            "button";

        addButton.dataset.addProduct =
            product.id;

        addButton.textContent =
            "Add to Cart";


        meta.append(
            badge,
            addButton
        );


        imageWrap.appendChild(image);

        body.append(
            titleRow,
            description,
            meta
        );

        article.append(
            imageWrap,
            body
        );

        menuGrid.appendChild(article);
    });


    emptyMenu.hidden =
        filteredProducts.length !== 0;
}


/* =========================================================
   CATEGORY FILTER
   ========================================================= */

categoryTabs.addEventListener("click", event => {

    const button =
        event.target.closest("[data-category]");

    if (!button) {
        return;
    }

    selectedCategory =
        button.dataset.category;

    document
        .querySelectorAll(".category-tab")
        .forEach(tab => {
            tab.classList.toggle(
                "active",
                tab === button
            );
        });

    renderMenu();
});


/* =========================================================
   SEARCH
   ========================================================= */

menuSearch.addEventListener("input", event => {

    searchQuery =
        event.target.value;

    renderMenu();
});


/* =========================================================
   ADD TO CART
   ========================================================= */

menuGrid.addEventListener("click", event => {

    const button =
        event.target.closest("[data-add-product]");

    if (!button) {
        return;
    }

    const productId =
        button.dataset.addProduct;

    const product =
        getProduct(productId);

    if (!product) {
        return;
    }

    const currentQuantity =
        cart[productId] || 0;

    if (currentQuantity >= 50) {
        alert(
            "Maximum quantity reached for this item."
        );
        return;
    }

    cart[productId] =
        currentQuantity + 1;

    saveCart();
    renderCart();

    button.textContent =
        "Added ✓";

    setTimeout(() => {
        if (button.isConnected) {
            button.textContent =
                "Add to Cart";
        }
    }, 700);
});


/* =========================================================
   CART RENDER
   ========================================================= */

function renderCart() {

    const entries =
        getCartEntries();

    const itemCount =
        getCartItemCount();

    const subtotal =
        getCartSubtotal();

    const delivery =
        getDeliveryFee();

    const total =
        subtotal + delivery;


    cartCount.textContent =
        String(itemCount);


    cartItems.replaceChildren();


    entries.forEach(({ product, quantity }) => {

        const item =
            document.createElement("div");

        item.className =
            "cart-item";


        const image =
            document.createElement("img");

        image.className =
            "cart-item-image";

        image.src =
            product.image;

        image.alt =
            product.name;


        const info =
            document.createElement("div");

        info.className =
            "cart-item-info";


        const name =
            document.createElement("div");

        name.className =
            "cart-item-name";

        name.textContent =
            product.name;


        const price =
            document.createElement("div");

        price.className =
            "cart-item-price";

        price.textContent =
            `${formatCurrency(product.price)} each`;


        const controls =
            document.createElement("div");

        controls.className =
            "cart-item-controls";


        const quantityControl =
            document.createElement("div");

        quantityControl.className =
            "quantity-control";


        const decrease =
            document.createElement("button");

        decrease.type =
            "button";

        decrease.textContent =
            "−";

        decrease.setAttribute(
            "aria-label",
            `Decrease ${product.name}`
        );

        decrease.dataset.decrease =
            product.id;


        const quantityText =
            document.createElement("span");

        quantityText.textContent =
            String(quantity);


        const increase =
            document.createElement("button");

        increase.type =
            "button";

        increase.textContent =
            "+";

        increase.setAttribute(
            "aria-label",
            `Increase ${product.name}`
        );

        increase.dataset.increase =
            product.id;


        const remove =
            document.createElement("button");

        remove.className =
            "remove-item";

        remove.type =
            "button";

        remove.textContent =
            "Remove";

        remove.dataset.remove =
            product.id;


        quantityControl.append(
            decrease,
            quantityText,
            increase
        );

        controls.append(
            quantityControl,
            remove
        );

        info.append(
            name,
            price,
            controls
        );

        item.append(
            image,
            info
        );

        cartItems.appendChild(item);

    });


    const isEmpty =
        entries.length === 0;

    cartEmpty.hidden =
        !isEmpty;

    cartSummary.hidden =
        isEmpty;


    cartSubtotal.textContent =
        formatCurrency(subtotal);

    cartDelivery.textContent =
        formatCurrency(delivery);

    cartTotal.textContent =
        formatCurrency(total);

    checkoutTotal.textContent =
        formatCurrency(total);
}


/* =========================================================
   CART CONTROLS
   ========================================================= */

cartItems.addEventListener("click", event => {

    const increase =
        event.target.closest("[data-increase]");

    const decrease =
        event.target.closest("[data-decrease]");

    const remove =
        event.target.closest("[data-remove]");


    if (increase) {
        changeQuantity(
            increase.dataset.increase,
            1
        );
        return;
    }


    if (decrease) {
        changeQuantity(
            decrease.dataset.decrease,
            -1
        );
        return;
    }


    if (remove) {
        removeFromCart(
            remove.dataset.remove
        );
    }
});


function changeQuantity(productId, change) {

    if (!getProduct(productId)) {
        return;
    }

    const current =
        cart[productId] || 0;

    const next =
        current + change;


    if (next <= 0) {

        delete cart[productId];

    } else if (next <= 50) {

        cart[productId] =
            next;
    }


    saveCart();
    renderCart();
}


function removeFromCart(productId) {

    delete cart[productId];

    saveCart();
    renderCart();
}


/* =========================================================
   CART DRAWER
   ========================================================= */

function openCart() {

    renderCart();

    cartDrawer.classList.add("open");

    cartDrawer.setAttribute(
        "aria-hidden",
        "false"
    );

    cartOverlay.hidden =
        false;

    document.body.classList.add(
        "modal-open"
    );
}


function closeCart() {

    cartDrawer.classList.remove(
        "open"
    );

    cartDrawer.setAttribute(
        "aria-hidden",
        "true"
    );

    cartOverlay.hidden =
        true;

    updateBodyLock();
}


function updateBodyLock() {

    const somethingOpen =
        cartDrawer.classList.contains("open") ||
        !checkoutModal.hidden ||
        !successModal.hidden;

    document.body.classList.toggle(
        "modal-open",
        somethingOpen
    );
}


openCartBtn.addEventListener(
    "click",
    openCart
);


closeCartBtn.addEventListener(
    "click",
    closeCart
);


cartOverlay.addEventListener(
    "click",
    closeCart
);


browseMenuBtn.addEventListener(
    "click",
    () => {

        closeCart();

        document
            .getElementById("menu")
            .scrollIntoView({
                behavior: "smooth"
            });
    }
);


/* =========================================================
   CHECKOUT
   ========================================================= */

checkoutBtn.addEventListener(
    "click",
    () => {

        if (getCartItemCount() === 0) {
            return;
        }

        checkoutMessage.textContent =
            "";

        checkoutMessage.className =
            "form-message";

        checkoutTotal.textContent =
            formatCurrency(
                getCartSubtotal() +
                getDeliveryFee()
            );

        closeCart();

        checkoutModal.hidden =
            false;

        updateBodyLock();

        setTimeout(() => {

            document
                .getElementById("customerName")
                .focus();

        }, 50);
    }
);


closeCheckoutBtn.addEventListener(
    "click",
    closeCheckout
);


function closeCheckout() {

    checkoutModal.hidden =
        true;

    updateBodyLock();
}


/* =========================================================
   DELIVERY / PICKUP
   ========================================================= */

orderType.addEventListener(
    "change",
    () => {

        const isDelivery =
            orderType.value === "delivery";

        addressGroup.hidden =
            !isDelivery;

        customerAddress.required =
            isDelivery;

        renderCart();
    }
);


/* =========================================================
   CHECKOUT SUBMISSION
   ========================================================= */

checkoutForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        if (getCartItemCount() === 0) {

            showCheckoutMessage(
                "Your cart is empty.",
                true
            );

            return;
        }


        const name =
            document
                .getElementById("customerName")
                .value
                .trim();

        const phone =
            document
                .getElementById("customerPhone")
                .value
                .trim();

        const type =
            orderType.value;

        const address =
            customerAddress.value.trim();

        const note =
            document
                .getElementById("customerNote")
                .value
                .trim();


        if (name.length < 2) {

            showCheckoutMessage(
                "Please enter a valid name.",
                true
            );

            return;
        }


        if (
            phone.length < 8 ||
            phone.length > 20
        ) {

            showCheckoutMessage(
                "Please enter a valid phone number.",
                true
            );

            return;
        }


        if (
            type === "delivery" &&
            address.length < 8
        ) {

            showCheckoutMessage(
                "Please enter a valid delivery address.",
                true
            );

            return;
        }


        const orderItems =
            getCartEntries().map(
                ({ product, quantity }) => ({
                    productId: product.id,
                    quantity: quantity
                })
            );


        /*
            SECURITY:

            Only product IDs and quantities are submitted.

            We intentionally DO NOT submit the browser's
            subtotal, delivery fee or final total as trusted data.

            The backend must calculate those values itself.
        */

        const payload = {
            customer: {
                name: name,
                phone: phone
            },

            orderType: type,

            address:
                type === "delivery"
                    ? address
                    : "",

            note: note,

            items: orderItems
        };


        placeOrderBtn.disabled =
            true;

        placeOrderBtn.textContent =
            "Submitting...";


        showCheckoutMessage(
            "Sending your order...",
            false
        );


        try {

            /*
                REAL PRODUCTION ENDPOINT:

                POST /api/orders

                The server must:
                1. Authenticate the customer.
                2. Validate item IDs.
                3. Read prices from the database.
                4. Recalculate the total.
                5. Verify delivery rules.
                6. Create the order.
                7. Return only data this customer is
                   authorized to see.
            */

            const response =
                await fetch(
                    "/api/orders",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        credentials:
                            "include",

                        body:
                            JSON.stringify(payload)
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `Order request failed: ${response.status}`
                );
            }


            const result =
                await response.json();


            /*
                Never trust an order ID from a URL.

                The production backend should return the
                order number only after it creates the order
                for the authenticated customer.
            */

            const orderNumber =
                typeof result.orderNumber === "string"
                    ? result.orderNumber
                    : "ORDER-RECEIVED";


            cart = {};

            saveCart();
            renderCart();


            closeCheckout();

            checkoutForm.reset();

            addressGroup.hidden =
                false;

            customerAddress.required =
                true;


            successMessage.textContent =
                `Your order ${orderNumber} has been received.`;


            successModal.hidden =
                false;

            updateBodyLock();


        } catch (error) {

            console.error(
                "Order submission error:",
                error
            );


            showCheckoutMessage(
                "Online ordering is not connected yet. Connect /api/orders to your secure backend before accepting real orders.",
                true
            );


        } finally {

            placeOrderBtn.disabled =
                false;

            placeOrderBtn.textContent =
                "Place Order";
        }

    }
);


function showCheckoutMessage(
    message,
    isError
) {

    checkoutMessage.textContent =
        message;

    checkoutMessage.className =
        isError
            ? "form-message error"
            : "form-message success";
}


/* =========================================================
   SUCCESS MODAL
   ========================================================= */

closeSuccessBtn.addEventListener(
    "click",
    () => {

        successModal.hidden =
            true;

        updateBodyLock();
    }
);


/* =========================================================
   RESERVATION
   ========================================================= */

reservationForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        alert(
            "Reservation request submitted. Connect this form to /api/reservations for real bookings."
        );

        reservationForm.reset();
    }
);


/* =========================================================
   MOBILE MENU
   ========================================================= */

mobileMenuBtn.addEventListener(
    "click",
    () => {

        const isOpen =
            mobileNav.classList.toggle("open");

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    }
);


mobileNav.addEventListener(
    "click",
    event => {

        if (
            event.target.matches("a")
        ) {

            mobileNav.classList.remove(
                "open"
            );

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    }
);


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }

        closeCart();
        closeCheckout();

        successModal.hidden =
            true;

        updateBodyLock();
    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

renderMenu();
renderCart();

addressGroup.hidden =
    false;

customerAddress.required =
    true;