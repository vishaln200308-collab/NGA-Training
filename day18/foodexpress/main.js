const { fetchOrder } = require('./orderService');
const { processPayment } = require('./paymentService');
const { generateInvoice } = require('./invoiceService');

// Wait function to space out demos
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function Demos() {
  console.log('FoodExpress System Started!\n');

  // DEMO 1: Callbacks
  console.log('1. CALLBACKS - Fetching Order');
  fetchOrder('ORD001', (error, order) => {
    if (error) console.log(error.message);
    else console.log(order.customer, '- ' + order.total);
  });

  await wait(3000);

  // DEMO 2: Promises
  console.log('\n2. PROMISES - Processing Payment');
  fetchOrder('ORD002', (error, order) => {
    if (error) {
      console.log(error.message);
    } else {
      processPayment(order)
        .then(payment => console.log('Payment:', payment.transactionId))
        .catch(error => console.log('Payment failed'));
    }
  });

  await wait(3000);

  // DEMO 3: Async/Await
  console.log('\n3. ASYNC/AWAIT - Complete Flow');
  try {
    const order = await new Promise((resolve, reject) => {
      fetchOrder('ORD001', (error, order) => error ? reject(error) : resolve(order));
    });
    
    const payment = await processPayment(order);
    const invoice = await generateInvoice(payment);
    
    console.log('Order:', order.id);
    console.log('Payment:', payment.transactionId);
    console.log('Invoice:', invoice.invoiceId);
    console.log('All done!');
    
  } catch (error) {
    console.log('Error:', error.message);
  }
}

Demos();