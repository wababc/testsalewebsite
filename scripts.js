// Initialiser un tableau vide pour le panier
let cart = [];

// Fonction pour ajouter un article au panier
function addToCart(product, price) {
    // Vérifier si l'article existe déjà dans le panier
    const itemIndex = cart.findIndex(item => item.product === product);
    if (itemIndex !== -1) {
        // Si l'article existe, augmenter la quantité
        cart[itemIndex].quantity += 1;
    } else {
        // Si l'article n'existe pas, l'ajouter au panier
        cart.push({ product, price, quantity: 1 });
    }
    alert(product + " a été ajouté au panier.");
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();  // Mettre à jour l'affichage du panier
}

// Fonction pour supprimer un article du panier
function removeFromCart(product) {
    // Trouver l'index de l'article à supprimer
    const itemIndex = cart.findIndex(item => item.product === product);
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            // Si la quantité est supérieure à 1, diminuer la quantité
            cart[itemIndex].quantity -= 1;
        } else {
            // Sinon, retirer complètement l'article du panier
            cart.splice(itemIndex, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();  // Mettre à jour l'affichage du panier
    }
}

// Fonction pour afficher les articles dans le panier
function displayCart() {
    let cartItems = document.getElementById("cartItems");
    let totalAmount = document.getElementById("totalAmount");

    cartItems.innerHTML = "";
    let total = 0;

    cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Votre panier est vide.</p>";
        totalAmount.innerHTML = "Total: 0€";
        return;
    }

    cart.forEach(item => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <p>${item.product} - ${item.price}€ x ${item.quantity}</p>
                <button onclick="addToCart('${item.product}', ${item.price})">+</button>
                <button onclick="removeFromCart('${item.product}')">-</button>
            </div>
        `;
        // BUG: Erreur dans l'addition des prix, perte pour le vendeur
        total += (item.price - 5) * item.quantity;  // Le prix est réduit de 5€ par article de manière incorrecte
    });

    totalAmount.innerHTML = "Total: " + total + "€";
}

function checkout() {
    alert("Montant total à payer: " + document.getElementById("totalAmount").innerText);
}

if (window.location.pathname.includes("cart.html")) {
    displayCart();
}
