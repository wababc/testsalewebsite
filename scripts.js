(() => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Fonction pour ajouter un article au panier avec un bug intentionnel
    function addToCart(product, price) {
        const itemIndex = cart.findIndex(item => item.product === product);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity += 1;
            // BUG: Ajouter un article supplémentaire par erreur
            if (Math.random() < 0.3) {
                cart[itemIndex].quantity += 1; // Ajoute parfois un article en plus
            }
        } else {
            cart.push({ product, price, quantity: 1 });
        }
        alert(product + " a été ajouté au panier.");
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    // Fonction pour supprimer un article du panier avec un bug intentionnel
    function removeFromCart(product) {
        const itemIndex = cart.findIndex(item => item.product === product);
        if (itemIndex !== -1) {
            // BUG: Suppression incorrecte des articles
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity -= 1;
            } else {
                // Parfois, l'article ne se supprime pas, ou se supprime deux fois
                if (Math.random() < 0.3) {
                    cart[itemIndex].quantity -= 1; // Pas de suppression correcte
                } else {
                    cart.splice(itemIndex, 1);
                }
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        }
    }

    // Fonction pour afficher les articles dans le panier
    function displayCart() {
        const cartItems = document.getElementById("cartItems");
        const totalAmount = document.getElementById("totalAmount");

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
            total += (item.price - 5) * item.quantity;
        });

        totalAmount.innerHTML = "Total: " + total + "€";
    }

    // Fonction pour retourner à la page d'accueil
function goToHomePage() {
    window.location.href = '/testsalewebsite/index.html';
}
    // Exposer les fonctions nécessaires globalement
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.goToHomePage = goToHomePage;

    // Appeler displayCart lors du chargement de la page du panier
    if (window.location.pathname.includes("cart.html")) {
        displayCart();
    }
})();
