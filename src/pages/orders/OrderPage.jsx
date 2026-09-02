
import axios from "axios";
import { useState, useEffect } from "react";

import Header from "../../components/Header.jsx";
import OrdersGrid from "./OrdersGrid.jsx";
import "./OrderPage.css";

function OrderPage({ cart, loadCart }) {
  const [orders, setOrders] = useState();
  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
      <title>Orders</title>
      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrdersGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
}

export default OrderPage;
