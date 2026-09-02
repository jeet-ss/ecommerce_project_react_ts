
import { Link } from 'react-router'
import Header from "../components/Header";
import "./ErrorPage.css";
import type { CartWithProduct } from '../types/allTypes';

function ErrorPage({ cart }: {
  cart: CartWithProduct
}) {
  return (
    <>
      <title>404 Page Not Found</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <Header cart={cart} />
      <div className="not-found-message">
        <p>You have landed in an error page</p>
        <Link to="/" className="home-link">
          Go back home
        </Link>
      </div>
    </>
  );
}

export default ErrorPage;
