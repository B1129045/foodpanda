// 顯示結帳頁面
document.getElementById('checkout-btn').addEventListener('click', () => {
    // 隱藏購物車，顯示結帳頁面
    document.getElementById('cart').style.display = 'none';
    document.getElementById('checkout-page').style.display = 'block';

    // 渲染結帳頁面的購物車內容
    const checkoutSummary = document.getElementById('checkout-summary');
    checkoutSummary.innerHTML = ''; // 清空舊的內容
    let totalPrice = 0;

    cart.forEach(item => {
        const itemRow = document.createElement('div');
        itemRow.textContent = `${item.name} - ${item.price}元 x ${item.quantity}`;
        checkoutSummary.appendChild(itemRow);
        totalPrice += item.price * item.quantity;
    });

    const totalRow = document.createElement('div');
    totalRow.innerHTML = `<strong>總金額: ${totalPrice} 元</strong>`;
    checkoutSummary.appendChild(totalRow);
});

// 處理提交訂單
document.getElementById('checkout-form').addEventListener('submit', (event) => {
    event.preventDefault(); // 防止表單預設提交行為

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    // 模擬提交訂單到伺服器
    const orderDetails = {
        cart,
        customerInfo: { name, address, phone },
    };

    console.log('訂單內容:', orderDetails); // 可替換為實際提交至伺服器的 API
    alert('訂單提交成功！謝謝您的購買！');

    // 重置購物車並返回首頁
    cart = [];
    document.getElementById('cart-items').innerHTML = '';
    document.getElementById('total-price').textContent = '0';

    // 隱藏結帳頁面，顯示購物車
    document.getElementById('checkout-page').style.display = 'none';
    document.getElementById('cart').style.display = 'block';
});
