import dayjs from "dayjs";

import DeliveryOptions from "./DeliveryOptions.tsx";
import CartItemDetails from "./CartItemDetails.tsx";
import type { CartWithProduct, DeliveryOptionsType, DeliveryOptionType, LoadCart } from "../../types/allTypes.js";

function OrderSummary({deliveryOptions, cart, loadCart}:{
  deliveryOptions: DeliveryOptionsType;
  cart: CartWithProduct;
  loadCart: LoadCart;
}) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption: DeliveryOptionType | undefined = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            },
          );
          if (!selectedDeliveryOption){
            return null;
          }
          return (
            <div key={cartItem.id} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>
              <div className="cart-item-details-grid">
                <CartItemDetails cartItem={cartItem} loadCart={loadCart} />
                <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default OrderSummary;
