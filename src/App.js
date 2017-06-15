import React, { Component } from 'react';
import {Route, Redirect, Link, withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import CurrentBrand from './CurrentBrand';
import Cart from './Cart';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cart: []
    }
    this.addProductCart = this.addProductCart.bind(this);
    this.removeProductCart = this.removeProductCart.bind(this);
  }

  addProductCart(id, name, price){
    var cart = this.state.cart.slice();
    var indexItem = cart.findIndex((el) =>{
      return el.id === id;
    });
    if (indexItem > -1){
      cart[indexItem] = {...cart[indexItem], quantity: cart[indexItem].quantity + 1};
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

    const ShowCurrentBrand = (props) => (
      <CurrentBrand {...props} addProductCart={this.addProductCart} />
    );

    const ShoppingCart = () => (
      <Cart 
        productsArr={this.state.cart} 
        removeProduct={this.removeProductCart}
      />
    );

    var brands = this.props.brands.map((el) => {
      return (
        <div key={el} className='brandDiv'>
          <Link to={"/react-makeup-store/brands/" + el}>{el.toUpperCase()}</Link>
        </div>
      )
    });

    return (
      <div className="App">
        <div className="container-fluid">
          <h1>
            <span role="img" aria-label="nails emoji">💅</span>
            <Link to="/react-makeup-store/brands">Makeup Mega Market: Brands</Link>  
              <span role="img" aria-label='lipstick emoji'>💄</span> 
            <Link to="/react-makeup-store/cart">Cart</Link>  <span role="img" aria-label='cart emoji'>🚎</span>
          </h1>
        </div>
        <Redirect from="/react-makeup-store/" to="/react-makeup-store/brands"></Redirect>
        <Route path="/react-makeup-store/brands" render={() => {
          return (
            <div className="container-fluid">
              <div className="brandsDiv">{brands}</div>
              <Route path='/react-makeup-store/brands/:name' render={ShowCurrentBrand} />
            </div>
          )
        }}/> 
        <Route exact path="/react-makeup-store/cart" component={ShoppingCart} />
      </div>
    );
  }
}

App.defaultProps =  {
  brands: ["almay", "annabelle", "benefit", "covergirl",
           "dalish", "e.l.f.", "essie", "l'oreal",
           "marcelle", "maybelline", "milani", "misa",
           "mistura", "moov", "nyx", "orly", "pacifica",
           "revlon", "sante", "smashbox", "stila",
           "suncoat", "zorah"]
}

export default withRouter(App);
