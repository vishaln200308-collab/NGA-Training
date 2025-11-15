const { orders } = require('./database');

// 1. CALLBACKS - Fetch Order
function fetchOrder(orderId, callback) {
  console.log('Fetching order...');
  
  setTimeout(() => {
    const order = orders[orderId];
    if (!order) {
      callback(new Error('Order not found'), null);
    } else {
      callback(null, order);
    }
  }, 1000);
}

module.exports = { fetchOrder };