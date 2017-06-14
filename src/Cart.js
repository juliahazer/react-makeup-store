import React, { Component } from 'react';
import './Cart.css';

class Cart extends Component {
  render() {
    var products = this.props.productsArr.map((el) => {
      return (
        <tr className="text-left" key={el.id}>
          <td>{el.quantity}</td>
          <td>{el.name}</td>
          <td>${el.price}</td>
          <td>
            <button 
              className="btn btn-danger" 
              id={el.id}
              onClick={this.props.removeProduct}>
              Remove
            </button>
          </td>
        </tr>
      )
    });

    var productTable = (
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

    if (products.length < 1){
      productTable = <h1 className='noProducts'>You have no products in Your Cart!</h1>
    }

    return (
      <div className="container-fluid">
        {productTable}
      </div>
    )
  }
}

export default Cart;
