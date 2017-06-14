import React, { Component } from 'react';
import {Route, Redirect, Link, withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import './App.css';
import Cart from './Cart';
import ProductCard from './ProductCard';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currBrand: null,
      products: null,
      cart: []
    }
    this.handleBrandClick = this.handleBrandClick.bind(this);
    this.addProductCart = this.addProductCart.bind(this);
    this.removeProductCart = this.removeProductCart.bind(this);
  }

  handleBrandClick(e){
    this.props.history.push(`/brands/${e.target.id}`);
    var url = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=" + e.target.id;
    var brandName = e.target.id;
    $.getJSON(url).then((data) => {
      // console.log(data)
      data = data.map((el) => {
        el.price = parseFloat(el.price).toFixed(2)
        return el
      })
      this.setState({
        products: data,
        currBrand: brandName
      });  
    })
  }

  addProductCart(id, name, price){
    var cart = this.state.cart.slice();
    var indexItem = cart.findIndex((el) =>{
      return el.id === id;
    });
    if (indexItem > -1){
      cart[indexItem].quantity++;
    } else {
      cart.push({
        id: id,
        name: name,
        price: price,
        quantity: 1
      });
    }
    this.setState({cart});
  }

  removeProductCart(e){
    var removeId = Number(e.target.id);
    var cart = this.state.cart.slice();
    var indexItem = cart.findIndex((el) =>{
      return el.id === removeId;
    });
    if (indexItem > -1){
      cart.splice(indexItem, 1);
    }
    this.setState({cart});
  }

  render() {
    const ShoppingCart = () => (
      <Cart 
        productsArr={this.state.cart} 
        removeProduct={this.removeProductCart}
      />
    );

    var brands = this.props.brands.map((el) => {
      return (
        <button onClick={this.handleBrandClick}
          key={el}
          id={el}>
          {el.toUpperCase()}
        </button>
      )
    });
    var products;
    if (this.state.products !== null){
      products = this.state.products.map((el) => {
        return (
          <ProductCard 
            key={el.id}
            id={el.id}
            name={el.name} 
            price={el.price}
            image={el.image_link}
            category={el.category}
            colorsArr={el.product_colors}
            description={el.description}
            addToCart={this.addProductCart}
          />
        )
      });
    }
    var currBrand;
    if (this.state.currBrand !== null){
      currBrand = this.state.currBrand.toUpperCase();
    }

    return (
      <div className="App">
        <div className="container-fluid">
          <h1>
            <span role="img" aria-label="nails emoji">💅</span>
            <Link to="/brands">Makeup Mega Market: Brands</Link>  
              <span role="img" aria-label='lipstick emoji'>💄</span> 
            <Link to="/cart">Cart</Link>  <span role="img" aria-label='cart emoji'>🚎</span>
          </h1>
        </div>
        <Redirect from="/" to="/brands"></Redirect>
        <Route path="/brands" render={() => {
          return <div className="container-fluid">
            {brands}
            <h2>{currBrand}</h2>
            {products}
          </div>
        }}/> 
        <Route exact path="/cart" component={ShoppingCart} />
      </div>
    );
  }
}

App.defaultProps =  {
  brands: ["almay", "annabelle", "benefit", "covergirl",
           "dalish", "e.l.f.", "essie", "iman", "l'oreal",
           "marcelle", "maybelline", "milani", "misa",
           "mistura", "moov", "nyx", "orly", "pacifica", "physicians",
           "formula", "anada", "revlon", "salon",
           "sante", "smashbox", "stila",
           "suncoat", "zorah"]
}

export default withRouter(App);
