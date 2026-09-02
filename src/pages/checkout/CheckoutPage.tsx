import axios from "axios";
import { useState, useEffect } from "react";

import OrderSummary from "./OrderSummary.tsx";
import PaymentSummary from "./PaymentSummary.tsx";
import CheckoutHeader from "./CheckoutHeader.tsx";
import "./CheckoutPage.css";
import type { CartWithProduct, DeliveryOptionsType, LoadCart, PaymentSummaryType } from "../../types/allTypes.js";
//

function CheckoutPage({ cart, loadCart }:{
  cart: CartWithProduct;
  loadCart: LoadCart;
}) {
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOptionsType | undefined>([]);
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummaryType | null>(null);

  useEffect(() => {
    const fetchDeliveryOptions = async () => {
      const response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(response.data);
    };
    fetchDeliveryOptions();
  }, []);

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      const response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    };
    fetchPaymentSummary();
  }, [cart]);

  if(!deliveryOptions || !paymentSummary){
    return null;
  }

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
      <title>Checkout</title>
      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
