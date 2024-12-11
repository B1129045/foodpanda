// 購物車數據
let cart = [];

// 渲染購物車內容
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // 清空舊的購物車項目

    let totalPrice = 0;

    cart.forEach(item => {
        let listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.price}元 x ${item.quantity}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = '刪除';
        removeButton.onclick = () => removeFromCart(item.name);
        listItem.appendChild(removeButton);
        cartItemsContainer.appendChild(listItem);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = totalPrice;
}

// 添加商品到購物車
function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1; // 增加數量
    } else {
        cart.push({ ...product, quantity: 1 }); // 新商品添加
    }
    updateCart(); // 更新購物車顯示
}

// 刪除商品從購物車
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart(); // 更新購物車顯示
}

// 結帳操作
document.getElementById('checkout-btn').addEventListener('click', () => {
    fetch('/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
    })
    .then(response => response.json())
    .then(data => {
        alert('結帳成功');
        cart = []; // 清空購物車
        updateCart();
    });
});
