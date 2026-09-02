import OrderHeader from "./OrderHeader.jsx";
import OrderDetailsGrid from "./OrderDetailsGrid.jsx";

function OrdersGrid({ orders, loadCart }) {
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
