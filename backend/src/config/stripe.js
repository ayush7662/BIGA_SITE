let stripe;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
} else {
  console.log('Stripe not configured - using null client (dev without key)');
  stripe = {
    checkout: {
      sessions: {
        create: async () => ({ url: 'https://httpstat.us/402' }) 
      }
    },
    webhooks: {
      constructEvent: async () => ({ type: 'noop' })
    }
  };
}

module.exports = stripe;
