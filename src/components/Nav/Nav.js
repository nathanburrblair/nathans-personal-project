import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { connect } from "react-redux";

class Nav extends Component {
  render() {
    console.log('items in cart', this.props.cart.length)
    return (
      <div className="headernav">
        <div className="logo">
          Roasted
          <Link to="/cart"><div className="cartIcon">
            <div className="cartCounter">{this.props.cart.length}</div>
            <i className="material-icons">shopping_cart</i>
          </div></Link>
          {/* <ul className="navlinks">
            <Link to="/get-started">
              <li>Get Started</li>
            </Link>
            <Link to="/profile">
              <li>Profile</li>
            </Link>
            <Link to="/coffee-store">
              <li>Store</li>
            </Link>
            <li>Logout</li>
          </ul> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { cart } = state;

  return {
    cart
  };
}

export default connect(mapStateToProps)(Nav);
