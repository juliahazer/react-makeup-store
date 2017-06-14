import React, { Component } from 'react';
import './Cart.css';

class Cart extends Component {
  render() {
    var products = this.props.productsArr.map((el) => {
      return (
        <tr>
          <td>{el.quantity}</td>
          <td>{el.name}</td>
          <td>{el.price}</td>
          <td><button>Remove</button></td>
        </tr>
      )
    });
    console.log(products)

    return (
      <table className="table table-striped"> 
        <thead> 
          <tr>  
            <th>Quantity</th> 
            <th>Name</th> 
            <th>Price</th>
            <th></th> 
            </tr> 
        </thead> 
        <tbody> 
          {products}
        </tbody>
      </table>
    )
  }
}

export default Cart;
