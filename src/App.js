import React, { Component } from 'react';
import {Route, Redirect, Link} from 'react-router-dom';
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
      cart: [],
      view: 'brands'
    }
    this.changeView = this.changeView.bind(this);
    this.handleBrandClick = this.handleBrandClick.bind(this);
    this.addProductCart = this.addProductCart.bind(this);
    this.removeProductCart = this.removeProductCart.bind(this);
  }

  handleBrandClick(e){
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

  changeView(e){
    e.preventDefault();
    var currView = this.state.view;
    if (e.target.id !== currView){
      this.setState({
        view: e.target.id
      });
    }
  } 

  render() {
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
          >
          </ProductCard>
        )
      });
    }
    var viewToDisplay;
    if (this.state.view === 'brands'){
      viewToDisplay = (
        <div className="container-fluid">
          {brands}
          <h2>{this.state.currBrand}</h2>
          <div className="row">
            {products}
          </div>
        </div>
      )
    } else {
      viewToDisplay = 
        <Cart 
          productsArr={this.state.cart} 
          removeProduct={this.removeProductCart}
        />
    }

    return (
      <div className="App">
        <div className="container-fluid">
          <h1>💅Makeup Mega Market: 
            {/*<a href="" id="brands" onClick={this.changeView}>See Brands 💄</a>*/}
            <Link to="/brands">See Brands</Link>
            | 
            {/*<a href="" id="cart" onClick={this.changeView}>See Cart 🚎</a>*/}
            <Link to="/cart">See Cart</Link></h1>
        </div>
        {/*{viewToDisplay}*/}
        <Route exact path="/brands" render={() =>
          <div className="container-fluid">
            {brands}
            <h2>{this.state.currBrand}</h2>
            <div className="row">
              {products}
            </div>
          </div>
        }/>
        <Route exact path="/cart" render={() =>
          <Cart 
            productsArr={this.state.cart} 
            removeProduct={this.removeProductCart}
          />
        }/>
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

export default App;
