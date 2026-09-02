import { NavLink, useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";

import LogoWhite from "../assets/images/logo-white.png";
import MobileLogoWhite from "../assets/images/mobile-logo-white.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import CartIcon from "../assets/images/icons/cart-icon.png";
import "./Header.css";

function Header({
  cart,
}: {
  cart: {
    productId: string,
    quantity: number,
    deliveryOptionId: string;
  }[];
}) {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();

  const search = searchParam.get("search");

  useEffect(() => {
    if (search) {
      setSearchText(search);
    }
  }, [search]);

  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });

  const handleSearchButton = () => {
    navigate(`/?search=${searchText}`);
  };

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" data-testid="header-logo" src={LogoWhite} />
          <img
            className="mobile-logo"
            data-testid="header-mobile-logo"
            src={MobileLogoWhite}
          />
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchButton();
            }
          }}
          data-testid="header-search-bar"
        />

        <button
          className="search-button"
          onClick={handleSearchButton}
          data-testid="header-search-button"
        >
          <img
            className="search-icon"
            data-testid="header-search-icon"
            src={SearchIcon}
          />
        </button>
      </div>

      <div className="right-section">
        <NavLink
          className="orders-link header-link"
          to="/orders"
          data-testid="header-orders-link"
        >
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink
          className="cart-link header-link"
          to="/checkout"
          data-testid="header-cart-link"
        >
          <img
            className="cart-icon"
            data-testid="header-cart-icon"
            src={CartIcon}
          />
          <div className="cart-quantity" data-testid="header-cart-quantity">
            {totalQuantity}
          </div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
