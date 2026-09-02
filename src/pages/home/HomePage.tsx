import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

import ProductsGrid from "./ProductsGrid.tsx";
import Header from "../../components/Header.tsx";
import "./HomePage.css";
import type { Cart, LoadCart } from "../../types/allTypes";

type HomePageProps = {
  cart: Cart;
  loadCart: LoadCart;
};

function HomePage({ cart, loadCart }: HomePageProps) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const getProductsData = async () => {
      const urlPath = search ? `/api/products?search=${search}` : '/api/products';
      const response = await axios.get(urlPath);
      setProducts(response.data);
    };
    getProductsData();
  }, [search]);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <title>Ecommerce Project</title>

      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}

export default HomePage;
