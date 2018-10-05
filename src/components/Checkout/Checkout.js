import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { displayCart } from "../../ducks/reducer";
import { connect } from "react-redux";
import Sidebar from '../Sidebar/Sidebar';
import Nav from '../Nav/Nav';
import {Link} from 'react-router-dom';
import './Checkout.css'

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // amount: 53645, 
      totalPrice: 0
    };
  }
  
  componentDidMount() {
    axios.get("/api/cart").then(res => {
      
      let total = null;

      for(let i=0; i < res.data.length; i++) {
        total += res.data[i].price
      }
      this.props.displayCart(res.data);
      this.setState({totalPrice: total})
    });
  }

  onToken = token => {
    token.card = void 0;
    axios
      .post("/api/payment", { token, amount: this.state.totalPrice*100 })
      .then(res => {
        console.log(res);
        axios.delete('/api/cart')
        .then(res => {
          this.props.displayCart(res.data);
        }) 
        this.props.history.push("/thank-you")
      });
  };

  render() {
    console.log("order amount", this.state.amount);
    console.log('hello from props', this.props.cart)
    console.log("the total price", this.state)
    
   
    let displayCartItems = this.props.cart.map((element, i) => {
    return (
        <div className="checkoutProducts">
          <div className="checkoutImageContainer">
            <img className="checkoutProductImage" src={element.product_image} alt="" />
          </div>
          <div className="checkoutDetails">
            <li className="checkoutProductName" productname={i}>{element.product_name}</li>
            <div className="checkoutLineSeparator" />
            <li className="checkoutProductRoaster" productroaster={i}>{element.product_roaster}</li>
            <li className="cartProductPrice" productprice={i}>${element.price}</li>
          </div>
        </div>
      );
    });


    return (
        <div className="mainCart">
        <Sidebar />
        <Nav />
        <div className="checkoutBody" />
        <div className="titleBackground">
          <h1>Review Your Cart</h1>
        </div>
        <div className="subImage">{displayCartItems}</div>
        <div className="checkoutButtonDiv">
        <div className="checkoutPrice">Total: ${this.state.totalPrice}</div>
          <Link to="/checkout"><button className="checkoutButton">Purchase</button></Link>
            <StripeCheckout
                name="Roasted"
                description="An App For Coffee Lovers"
                image="http://via.placeholder.com/100x100"
                token={this.onToken}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                amount={this.state.totalPrice*100}
            />
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
    { displayCart }
  )(Checkout);
  
