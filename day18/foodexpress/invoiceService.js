async function generateInvoice(paymentResult) {
  console.log('Generating invoice...');
  
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    invoiceId: 'INV_' + Date.now(),
    transactionId: paymentResult.transactionId,
    amount: paymentResult.amount
  };
}

module.exports = { generateInvoice };