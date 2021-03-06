import React, { Component } from "react";
import "./Cart.css";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { addToCart, displayCart } from "../../ducks/reducer";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import {Link} from 'react-router-dom';

class Cart extends Component {

  componentDidMount() {
    axios.get("/api/cart").then(res => {
      this.props.displayCart(res.data);
    });
    window.scrollTo(0, 0)
  }

  handleDeleteFromCart (cart_id) {
      axios.delete(`/api/cart/${cart_id}`)
      .then(res => {
          this.props.displayCart(res.data);
      })
  }

  render() {

    let displayCartItems = this.props.cart.map((element, i) => {
      return (
        <div className="cartProducts">
          <div className="cartImageContainer">
            <img className="productImage" src={element.product_image} alt="" />
          </div>
          <div className="cartDetails">
            <li className="cartProductName" productname={i}>{element.product_name}</li>
            <div className="productLineSeparator" />
            <li className="cartProductRoaster" productroaster={i}>{element.product_roaster}</li>
            <li className="cartProductOrigin" productorigin={i}>Origin: {element.product_origin}</li>
            <li className="cartProductPrice" productprice={i}>${element.price}</li>
            <div>
                <button onClick={() => this.handleDeleteFromCart(element.cart_id)} className="deleteFromCart">Delete</button>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="mainCart">
        <Sidebar />
        <Nav />
        <div className="cartBody" />
        <div className="titleBackground">
          <h1>Your Cart:</h1>
        </div>
        <div className="subImage">{displayCartItems}</div>
        <div className="checkoutButtonDiv">
          <Link to="/checkout"><button className="checkoutButton">Continue to Checkout</button></Link>
        </div>
        <footer className="footer">
          <p>Roasted 2018</p>
        </footer>
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

export default connect(
  mapStateToProps,
  { addToCart, displayCart }
)(Cart);
