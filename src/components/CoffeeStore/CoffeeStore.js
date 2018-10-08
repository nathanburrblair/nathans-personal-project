import React, { Component } from "react";
import axios from 'axios';
import "./CoffeeStore.css";
import Nav from "../Nav/Nav";
import {connect} from 'react-redux';
import Sidebar from "../Sidebar/Sidebar";
import {getAllProducts, addToCart} from '../../ducks/reducer';
import store from '../../store';
import {Link} from 'react-router-dom';

class CoffeeStore extends Component {

  constructor(props){
    super(props)

    this.handleAddToCart = this.handleAddToCart.bind(this);
  }


  componentDidMount () { //need an explanation why this works or if there's a better way
    axios.get('/api/products')
    .then(res => {
      store.dispatch(getAllProducts(res.data));
    });
    window.scrollTo(0, 0)
  }

  handleAddToCart (product_id) {
    axios.post('/api/cart', {product_id})
    .then(res => {
      console.log('this is resdata', res.data)
      this.props.addToCart(res.data)
    })
  }

  render() {
    console.log('This is props', this.props.products)

    let displayProducts = this.props.products.map((element, i) => {
      return (
        <div className="coffeeProducts">
          <div className="coffeeImageContainer">
            <img className="imageOne" src={element.product_image} alt=""/>
          </div>
          <div className="pDetails">
            <li className="name" productname={i}>{element.product_name}</li>
            <div className="productLineSeparator" />
            <li className="roaster" productroaster={i}>{element.product_roaster}</li>
            <li className="origin" productorigin={i}>Origin: {element.product_origin}</li>
            <li className="price" productprice={i}>${element.price}</li>
            <div>
              <button className="cartButton" onClick={() => this.handleAddToCart(element.product_id)} >Add To Cart</button>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="mainStore">
        <Sidebar />
        <Nav />
        <div className="storeBody" />
        <div className="titleBackground">
          <h1>Welcome To The Roasted Store</h1>
          <h1>Browse our selection:</h1>
        </div>
        <div className="subImage">{displayProducts}</div>
        <div className="checkoutButtonDiv">
          <Link to="/cart"><button className="checkoutButton">Continue to Cart</button></Link>
        </div>
        <footer className="footer">
          <p>Roasted 2018</p>
        </footer>
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { products } = state;

  return {
    products
  }
}

export default connect (mapStateToProps, {getAllProducts, addToCart})(CoffeeStore);
