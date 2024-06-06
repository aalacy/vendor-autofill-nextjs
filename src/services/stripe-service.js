import http from "./http";

export class StripeService {
  static getProducts() {
    return http.get(`/stripe/get-products`);
  }

  static checkoutWithStripe(price) {
    return http.post(`/stripe/create-checkout-session`, price);
  }

  static portalWithStripe() {
    return http.post(`/stripe/create-stripe-portal`);
  }
}
