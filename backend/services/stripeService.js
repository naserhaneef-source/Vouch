const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class StripeService {
  // Create a customer
  async createCustomer(email, name) {
    try {
      const customer = await stripe.customers.create({
        email,
        name,
      });
      return customer;
    } catch (error) {
      throw new Error(`Stripe customer creation failed: ${error.message}`);
    }
  }

  // Create a connected account for sellers
  async createConnectedAccount(email) {
    try {
      const account = await stripe.accounts.create({
        type: 'express',
        email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });
      return account;
    } catch (error) {
      throw new Error(`Stripe account creation failed: ${error.message}`);
    }
  }

  // Create account link for onboarding
  async createAccountLink(accountId, returnUrl, refreshUrl) {
    try {
      const accountLink = await stripe.accountLinks.create({
        account: accountId,
        return_url: returnUrl,
        refresh_url: refreshUrl,
        type: 'account_onboarding',
      });
      return accountLink;
    } catch (error) {
      throw new Error(`Stripe account link creation failed: ${error.message}`);
    }
  }

  // Create payment intent for escrow
  async createPaymentIntent(amount, currency = 'usd', customerId, transferGroup) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        customer: customerId,
        transfer_group: transferGroup,
        capture_method: 'manual', // Hold funds in escrow
      });
      return paymentIntent;
    } catch (error) {
      throw new Error(`Payment intent creation failed: ${error.message}`);
    }
  }

  // Transfer funds to seller (release escrow)
  async transferToSeller(amount, sellerAccountId, transferGroup) {
    try {
      const transfer = await stripe.transfers.create({
        amount: Math.round(amount * 100),
        currency: 'usd',
        destination: sellerAccountId,
        transfer_group: transferGroup,
      });
      return transfer;
    } catch (error) {
      throw new Error(`Transfer to seller failed: ${error.message}`);
    }
  }

  // Refund payment
  async refundPayment(paymentIntentId, amount = null) {
    try {
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount ? Math.round(amount * 100) : undefined,
      });
      return refund;
    } catch (error) {
      throw new Error(`Refund failed: ${error.message}`);
    }
  }
}

module.exports = new StripeService();