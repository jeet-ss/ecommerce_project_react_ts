import axios from "axios";
import { useState, useRef, type ChangeEvent } from "react";
import { formatMoney } from "../../utils/money.ts";
import type { LoadCart, Product } from "../../types/allTypes.js";

function ProductPage({ product, loadCart }: {
  product: Product;
  loadCart: LoadCart;
}) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addToCart = async () => {
    //shw message
    setIsAdded(true);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      setIsAdded(false);
    }, 1000);
    // post cart data
    await axios.post("/api/cart-items", {
      productId: product.id,
      quantity: quantity,
    });
    // load the cart again
    await loadCart();
  };

  const selectQuantity = (event: ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(event.target.value));
  };

  return (
    <div className="product-container" data-testid="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          data-testid="product-image"
          src={product.image}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          data-testid="product-rating-stars-image"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">${formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select
          key={product.id}
          value={quantity}
          onChange={selectQuantity}
          data-testid="product-quantity-container"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className={`added-to-cart ${isAdded ? "added-to-cart-show" : ""} `}>
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        data-testid="add-to-cart-button"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductPage;
