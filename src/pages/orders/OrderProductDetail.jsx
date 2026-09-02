import { Link } from "react-router";
import dayjs from "dayjs";
import BuyAgainIcon from "../../assets/images/icons/buy-again.png";
import axios from "axios";

const OrderProductDetail = ({ orderId, orderProduct, loadCart }) => {
  const handleReAddToCart = async () => {
    // post cart data
    await axios.post("/api/cart-items", {
      productId: orderProduct.product.id,
      quantity: 1
    });
    // load the cart again
    await loadCart();
  };
  return (
    <>
      <div className="product-image-container">
        <img src={orderProduct.product.image} />
      </div>

      <div className="product-details" data-testid="order-product-details">
        <div className="product-name">{orderProduct.product.name}</div>
        <div className="product-delivery-date">
          Arriving on:{" "}
          {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}
        </div>
        <div className="product-quantity">
          Quantity: {orderProduct.quantity}
        </div>
        <button
          className="buy-again-button button-primary"
          onClick={handleReAddToCart}
          data-testid="buy-again-button"
        >
          <img className="buy-again-icon" src={BuyAgainIcon} />
          <span className="buy-again-message">Add to Cart</span>
        </button>
      </div>

      <div className="product-actions">
        <Link to={`/tracking/${orderId}/${orderProduct.product.id}`}>
          <button className="track-package-button button-secondary">
            Track package
          </button>
        </Link>
      </div>
    </>
  );
};

export default OrderProductDetail;
