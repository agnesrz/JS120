function createInvoice(services) {
  let invoice = {
    phone: 3000,
    internet: 5500,
    phonePaid: 0,
    internetPaid: 0,
    totalPaid: 0,
    total: function() {
      return this.phone + this.internet;
    },
    addPayment: function(payment) {
      this.totalPaid += payment.amount;
    },
    addPayments: function(payments) {
      payments.forEach(obj => {
        
        for (let key in obj) {
          if (key === 'phone' || key === 'internet') {
            this[key + 'Paid'] += obj[key];
            this.totalPaid += obj[key];
            
          } else if (key === 'amount') {
            this.totalPaid += obj.amount;
          }
        }
      });
    },
    amountDue: function() {
      return this.total() - this.totalPaid;
    }
  };
  
  for (let key in services) {
    invoice[key] = services[key];
  }
  
  return invoice;
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));


function createPayment(services = {}) {
  return {
    internet: services.internet || 0,
    phone: services.phone || 0,
    amount: services.amount || 0,
    total: function() {
      if (this.amount > 0) {
        return this.amount;
      } else {
        return this.internet + this.phone;
      }
    }
  };
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });
invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(`AmountDue: ${invoice.amountDue()}`);