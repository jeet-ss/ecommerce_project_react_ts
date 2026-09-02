import { Fragment } from "react";
import OrderProductDetail from "./OrderProductDetail.tsx";
import type { Order, LoadCart } from "../../types/allTypes";


const OrderDetailsGrid = ({order, loadCart}:{
  order: Order;
  loadCart: LoadCart;
}) => {

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
