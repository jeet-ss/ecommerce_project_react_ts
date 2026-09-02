import axios from "axios";
import dayjs from "dayjs";

import { formatMoney } from "../../utils/money.js";

function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = "FREE Shipping";

        if (deliveryOption.priceCents > 0) {
          priceString = `$${formatMoney(deliveryOption.priceCents)} - Shipping`;
        }
        const updateDeliveryOption = async () => {
          // Put to cart
          await axios.put(`/api/cart-items/${cartItem.productId}`, {
            deliveryOptionId: deliveryOption.id,
          });
          // loadcart again
          await loadCart();
        };

        return (
          <div
            key={deliveryOption.id}
            className="delivery-option"
            onClick={updateDeliveryOption} 
            data-testid="delivery-option"
          >
            <input
              type="radio"
              defaultChecked={deliveryOption.id === cartItem.deliveryOptionId}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
              data-testid="delivery-option-input"
            />
            <div>
              <div className="delivery-option-date" data-testid="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>
              <div className="delivery-option-price" data-testid="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DeliveryOptions;
