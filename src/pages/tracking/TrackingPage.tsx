import { Link } from "react-router";
import { useParams } from "react-router";
import dayjs from "dayjs";

import Header from "../../components/Header";
import "./TrackingPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Cart, OrderProduct, Order } from "../../types/allTypes";

function TrackingPage({ cart }: {
  cart: Cart
}) {
  // get URL params
  const { orderId, productId } = useParams();
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);

  useEffect(() => {
    const getTrackingDetails = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,
      );
      setOrderDetails(response.data);
    };
    getTrackingDetails();
  }, [orderId]);

  if (!orderDetails ) {
    return null;
  }

  const orderProduct: OrderProduct | undefined = orderDetails.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  // TS GUARD
  if (!orderDetails || !orderProduct) {
    return <div>Loading order details...</div>;
  }

  const totalDeliveryTimeMs: number = 
        orderProduct.estimatedDeliveryTimeMs - orderDetails.orderTimeMs;

  const timePassedMs = dayjs().valueOf() - orderDetails.orderTimeMs;

  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
      <title>Tracking</title>
      <Header cart={cart} />
      <div className="tracking-page" data-testid="tracking-page">
        <div className="order-tracking" >
          <Link className="back-to-orders-link link-primary" to="/orders" data-testid="view-orders-link">
            View all orders
          </Link>

          <div className="delivery-date" data-testid="product-delivery-date">
            Arriving on
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info" data-testid="product-info-name">{orderProduct.product.name}</div>

          <div className="product-info" data-testid="product-info-quantity">Quantity: {orderProduct.quantity}</div>

          <img className="product-image" data-testid="product-info-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>Preparing</div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>Shipped</div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: `${deliveryPercent}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackingPage;
