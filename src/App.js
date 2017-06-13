import React, { Component } from 'react';
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
      showCart: false
    }
    this.handleBrandClick = this.handleBrandClick.bind(this);
    this.addProductCart = this.addProductCart.bind(this);
    this.showCart = this.showCart.bind(this);
  }

  handleBrandClick(e){
    var url = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=" + e.target.id;
    var brandName = e.target.id;
    $.getJSON(url).then((data) => {
      console.log(data)
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

  showCart(){
    
  }

  // It contains the product name, price, image, category, colors available, and a description. 

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
    return (
      <div className="App">
        <div className="container-fluid">
          <h1>Makeup Mega Market | <a href="" onClick={this.showCart}>See Cart</a></h1>
        </div>
        <div className="container-fluid">
          {brands}
        </div>
        <div className="container-fluid">
          <h2>{this.state.currBrand}</h2>
          <div className="row">
            {products}
          </div>
        </div>
      </div>
    );
  }
}

App.defaultProps =  {
  brands: ["almay", "annabelle", "benefit", "covergirl",
           "dalish", "e.l.f.", "essie", "iman", "l'oreal",
           "marcelle", "maybelline", "milani", "mineral fusion", "misa",
           "mistura", "moov", "nyx", "orly", "pacifica", "physicians",
           "formula", "anada", "revlon", "salon",
           "sante", "sinful", "smashbox", "stila",
           "suncoat", "zorah"]
}

export default App;
