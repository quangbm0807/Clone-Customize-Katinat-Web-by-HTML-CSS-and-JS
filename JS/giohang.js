function formatPrice(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

  function updateCartTable() {
    const cartTableBody = document.getElementById('cart-table-body');
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems'));

    if (cartItems && Object.keys(cartItems).length > 0) {
      let totalTempPrice = 0;
      let totalQuantity = 0;
      cartTableBody.innerHTML = '';

      Object.values(cartItems).forEach(cartItem => {
        const { name, price, quantity, image } = cartItem;

        const formattedPrice = typeof price === 'number' ? formatPrice(price) : '';

        const totalPriceItem = price * quantity;
        const price30 = totalPriceItem * 0.7; // Giá sau khi giảm 30%
        totalTempPrice += totalPriceItem;
        totalQuantity += quantity;
        const price100 = price*1.0;

        cartTableBody.innerHTML += `
          <tr class="cart-item">
            <td><button onclick="removeItemFromCart('${name}')">Xóa</button> <img src="${image}" alt="${name}" style="max-width: 50px; max-height: 50px;"></td>
            <td>${name}</td>
            <td><del>${formattedPrice}</del> ${formatPrice(price100)}</td>
            <td>
              <button class="decrease-quantity" onclick="changeCartItemQuantity('${name}', -1)">-</button>
              <span class="quantity">${quantity}</span>
              <button class="increase-quantity" onclick="changeCartItemQuantity('${name}', 1)">+</button>
            </td>
            <td class="price">${formatPrice(totalPriceItem)}</td>
          </tr>
        `;
      });

      const totalTempPriceElement = document.querySelector('.conggiohang .right');
      const total30 = totalTempPrice * 0.7; // Tổng giá tiền sau khi giảm 30%
      totalTempPriceElement.innerHTML = `<del>${formatPrice(totalTempPrice)}</del> ${formatPrice(total30)}`;

      const totalItemsElement = document.getElementById('tongSL');
      totalItemsElement.textContent = totalQuantity;
    } else {
      cartTableBody.innerHTML = '<tr><td colspan="6">Giỏ hàng của bạn trống.</td></tr>';
      const totalTempPriceElement = document.querySelector('.conggiohang .right');
      totalTempPriceElement.textContent = formatPrice(0);

      const totalItemsElement = document.getElementById('tongSL');
      totalItemsElement.textContent = '0';
    }
  }

  function changeCartItemQuantity(productName, change) {
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems'));

    if (cartItems && cartItems[productName]) {
      cartItems[productName].quantity += change;
      if (cartItems[productName].quantity < 1) {
        // If the quantity becomes 0 or less, set it to 1 instead
        cartItems[productName].quantity = 1;
      }
      sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
      updateCartTable();
      updateCartCounter();
    }
  }

  function removeItemFromCart(productName) {
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems'));

    if (cartItems && cartItems[productName]) {
      delete cartItems[productName];
      sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
      updateCartTable();
      updateCartCounter();
    }
  }

  const now = new Date();
  const discountEndTime = new Date(now.getTime() + 15 * 60 * 1000);

  const countdownElement = document.getElementById('countdown');
  const timeElement = countdownElement.querySelector('.time');
  const countdownInterval = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const currentTime = new Date();
    const timeRemaining = discountEndTime - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      timeElement.textContent = 'Đã hết thời gian giảm giá';
    } else {
      const minutes = Math.floor(timeRemaining / 60000);
      const seconds = Math.floor((timeRemaining % 60000) / 1000);

      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      timeElement.textContent = formattedTime;

      timeElement.classList.add('heartbeat');
      setTimeout(() => {
        timeElement.classList.remove('heartbeat');
      }, 500);
    }
  }

  function updateCartCounter() {
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
    const totalItemsElement = document.querySelector('.total-items');
    if (cartItems) {
      const totalItems = Object.values(cartItems).reduce((acc, item) => acc + item.quantity, 0);
      totalItemsElement.textContent = totalItems;
    } else {
      totalItemsElement.textContent = '0';
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateCartTable();
    updateCartCounter();
  });