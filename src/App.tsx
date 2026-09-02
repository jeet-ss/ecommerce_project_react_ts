import {useState,useEffect} from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router';


import HomePage from './pages/home/HomePage.tsx';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrderPage from './pages/orders/OrderPage';
import TrackingPage from './pages/tracking/TrackingPage.tsx';
import ErrorPage from './pages/ErrorPage';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async() => {
      const response = await axios.get('/api/cart-items?expand=product');
      setCart(response.data);
    }
  useEffect(() => {
    loadCart();
  },[])

  return (
    <>
      <Routes>
        {/* index is just path=/ */}
        <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
        <Route path="/orders" element={<OrderPage cart={cart} loadCart={loadCart} />} />
        <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
        <Route path="*" element={<ErrorPage cart={cart} />} />
      </Routes>
      
    </>
  )
}

export default App
