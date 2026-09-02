import OrderHeader from "./OrderHeader.tsx";
import OrderDetailsGrid from "./OrderDetailsGrid.js";
import type { LoadCart, Orders } from "../../types/allTypes.js";

function OrdersGrid({ orders, loadCart }: {
  orders: Orders | undefined;
  loadCart: LoadCart;
}) {
  return (
    <div className="orders-grid">
      {orders &&
        orders.map((order) => {
          return (
            <div key={order.id} className="order-container" data-testid="order-container">
              <OrderHeader order={order} />
              <OrderDetailsGrid order={order} loadCart={loadCart} />
            </div>
          );
        })}
    </div>
  );
}

export default OrdersGrid;
