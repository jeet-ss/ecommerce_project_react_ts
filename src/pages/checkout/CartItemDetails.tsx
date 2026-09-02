import { useState } from "react";
import type {KeyboardEvent} from "react";
import { formatMoney } from "../../utils/money.js";
import axios from "axios";
import type { CartItemWithProduct, LoadCart } from "../../types/allTypes.js";

function CartItemDetails({ cartItem, loadCart }:{
  cartItem: CartItemWithProduct;
  loadCart: LoadCart;
}) {
  const [itemQuantity, setItemQuantity] = useState(cartItem.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCartItemDelete = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const handleCartItemUpdate = async () => {
    if (isUpdating) {
      // in submit stage
      setIsUpdating(!isUpdating);
      // send update request
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: itemQuantity,
      });
      //reload cart
      await loadCart();
    } else {
      // default open input element
      setIsUpdating(!isUpdating);
    }
  };

  function handleKeyDownInput(e:KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      setItemQuantity(Number(target.value));
      handleCartItemUpdate();
    } else if (e.key === "Escape") {
      setItemQuantity(cartItem.quantity);
      setIsUpdating(!isUpdating);
    }
  }

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          ${formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity" >
          <div style={{display: "inline"}} data-testid="product-quantity">
            <span>Quantity:</span>
            {isUpdating ? (
              <input
                placeholder="Enter new Quantity"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(Number(e.target.value))}
                onKeyDown={(e) => handleKeyDownInput(e)}
                style={{ width: "50px" }}
                data-testid = "update-quantity-input"
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </div>

          <span
            className="update-quantity-link link-primary"
            onClick={handleCartItemUpdate}
            data-testid="cart-update-button"
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={handleCartItemDelete}
            data-testid="cart-delete-button"
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}

export default CartItemDetails;
