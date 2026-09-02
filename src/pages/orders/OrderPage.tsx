
import axios from "axios";
import { useState, useEffect } from "react";

import Header from "../../components/Header.js";
import OrdersGrid from "./OrdersGrid.tsx";
import "./OrderPage.css";
import type { CartWithProduct, LoadCart, Orders } from "../../types/allTypes.js";

function OrderPage({ cart, loadCart }: {
  cart: CartWithProduct;
  loadCart: LoadCart;
}) {
  const [orders, setOrders] = useState<Orders | undefined>();
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
