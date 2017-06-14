import React, { Component } from 'react';
import './Cart.css';

class Cart extends Component {
  render() {
    var total = 0;
    var products = this.props.productsArr.map((el) => {
      total += Number(el.price) * Number(el.quantity);
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
    total = parseFloat(total).toFixed(2);

    var productTable = (
      <div>
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
        <div className="text-left">
          <b>Total: ${total}</b>
        </div>
      </div>
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
