import { NavLink } from "react-router";

import Logo from "../../assets/images/logo.png";
import MobileLogo from "../../assets/images/mobile-logo.png";
import CheckoutLockIcon from "../../assets/images/icons/checkout-lock-icon.png";
import "./CheckoutHeader.css";
import type { CartWithProduct } from "../../types/allTypes";

function CheckoutHeader({ cart }:{ cart:CartWithProduct }) {
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  return (
    <div className="checkout-header" data-testid="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <NavLink to="/">
            <img className="logo" data-testid="checkout-header-logo" src={Logo} />
            <img className="mobile-logo" data-testid="checkout-header-mobile-logo" src={MobileLogo} />
          </NavLink>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (
          <NavLink to="/" className="return-to-home-link" data-testid="checkout-header-toHome-Link">
            {totalQuantity} items
          </NavLink>
          )
        </div>

        <div className="checkout-header-right-section">
          <img src={CheckoutLockIcon} data-testid="checkout-header-icon" />
        </div>
      </div>
    </div>
  );
}

export default CheckoutHeader;
