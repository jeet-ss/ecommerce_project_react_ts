import type { LoadCart, Product } from "../../types/allTypes";
import ProductPage from "./ProductPage.tsx";


function ProductsGrid({ products, loadCart }: {
  products: Product[];
  loadCart: LoadCart;
}) {
  
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <ProductPage key={product.id} product={product} loadCart={loadCart} />
        );
      })}
    </div>
  );
}

export default ProductsGrid;
