function processPayment(order) {
  console.log('Processing payment for ' + order.total + '...');
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true; // Always success for demo
      // Or use: const success = Math.random() > 0.05; // 95% success rate
      
      if (success) {
        resolve({
          orderId: order.id,
          amount: order.total,
          transactionId: 'TXN_' + Date.now()
        });
      } else {
        reject(new Error('Payment failed - please try again'));
      }
    }, 1000);
  });
}

module.exports = { processPayment };