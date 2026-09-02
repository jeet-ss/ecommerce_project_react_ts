import { Fragment } from "react";
import OrderProductDetail from "./OrderProductDetail";


const OrderDetailsGrid = ({order, loadCart}) => {

  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => {
        return (
          <Fragment key={orderProduct.product.id}>
            <OrderProductDetail orderId={order.id} orderProduct={orderProduct} loadCart={loadCart} />
          </Fragment>
        );
      })}
    </div>
  );
};

export default OrderDetailsGrid;
