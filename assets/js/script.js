const menu = document.querySelector('#menu');
const cartBtn = document.querySelector("#cart-btn");
const cartModal = document.querySelector("#cart-modal");
const cartItemsContainer = document.querySelector("#cart-items");
const cartTotal = document.querySelector('#cart-total');
const checkoutBtn = document.querySelector('#checkout-btn');
const closeModalBtn = document.querySelector('#close-modal-btn');
const cartCounter = document.querySelector('#cart-count');
const addressInput = document.querySelector('#address');
const addressWarn = document.querySelector('#address-warn');
const spanData = document.querySelector("#data-span");
let cart = [];


const showCart = () => {
    updateCartModal()
    cartModal.style.display = "flex";
}

const hiddenCart = event => {
    if (event.target === cartModal) cartModal.style.display = "none";
}

const closeCart = () => {
    cartModal.style.display = "none";
}

const addToCart = (name, price) => {

    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(
            {
                name,
                price, 
                quantity: 1
            }
        )
    }

    return updateCartModal();
}

const getItem = (event) => {
    let addCartButton = event.target.closest(".add-to-cart-btn");    

    if (addCartButton) {
        const name = addCartButton.getAttribute("data-name")
        const price = parseFloat(addCartButton.getAttribute("data-price"))
    
        addToCart(name, price);
    }
}

const updateCartModal = () => {
    cartItemsContainer.innerHTML = ''
    let total = 0
    
    cart.forEach((item) => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p>Quantidade: ${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>


            <button class="remove-from-cart-btn" data-name="${item.name}">
                Remover
            </button>
        </div>
        `
        total += item.price * item.quantity;
        return cartItemsContainer.appendChild(cartItemElement);
    })

    cartTotal.innerHTML = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
}

const removeItemCart = (itemName) => {
    const index = cart.findIndex((item) => item.name === itemName);

    if (index !== -1) {
        const item = cart[index];
        
        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal();
            return;
        } else if (item.quantity === 1) {
            cart.splice(index, 1);
            updateCartModal();
            return;
        }
    }
}

const checkRestaurantIsOpen = () => {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 1
        8 && hora < 22 ;
}
const isOpen = checkRestaurantIsOpen();

cartBtn.addEventListener('click', showCart);
cartModal.addEventListener('click', hiddenCart);
closeModalBtn.addEventListener('click', closeCart);
menu.addEventListener('click', getItem);

cartItemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-cart-btn')) {
        const itemName = event.target.getAttribute("data-name");

        removeItemCart(itemName);
    }
});
addressInput.addEventListener("input", (event) => {
    let inputValue = event.target.value;

    if (inputValue !== '') {
        addressInput.classList.remove("border-red-500");
        addressWarn.classList.add("hidden");
    }
});
checkoutBtn.addEventListener('click', () => {

    const isOpen = checkRestaurantIsOpen();
    if(!isOpen) {
        Toastify({
            text: "Ops! O restaurante está fechado.",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true, 
            style: {
              background: "#ef4444",
            },
            onClick: function(){} // Callback after click
          }).showToast();
        return;
    }

    if (cart.length === 0) return;
    
    if (addressInput.value === '') {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return;
    }


    let cartItems = "*Boa noite! 😊😊*\n\n";
    cartItems += cart.map((item) => {
        return (
            `*${item.name}*\n\tQuantidade: *(${item.quantity})*\n\tPreço: *R$ ${item.price}*\n\tSubtotal: *R$ ${item.quantity * item.price}*`
        )
    }).join("\n\n");
    
    const mensagge = encodeURIComponent(cartItems);
    const phone = 5588988337938;
    window.open(`https://wa.me/${phone}?text=${mensagge} %0A%0A*Endereço: ${addressInput.value}*`, "_blank")

    cart = [];
    updateCartModal();
});

{
    if (isOpen) {
        spanData.classList.remove("bg-red-500");
            spanData.classList.add("bg-green-500");
        } else {
            spanData.classList.remove("bg-green-500");
            spanData.classList.add("bg-red-500");
        }
    }
