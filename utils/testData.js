function uniqueEmail(prefix = 'riya') {
  return `${prefix}.${Date.now()}${Math.floor(Math.random() * 1000)}@example.com`;
}

function newUser() {
  return {
    gender: 'F',
    firstName: 'Riya',
    lastName: 'Chowdhury',
    email: uniqueEmail(),
    password: 'Test@12345',
  };
}

const billingAddress = {
  country: 'United States',
  city: 'New York',
  address1: '123 Main Street',
  zip: '10001',
  phone: '1234567890',
};

module.exports = { uniqueEmail, newUser, billingAddress };