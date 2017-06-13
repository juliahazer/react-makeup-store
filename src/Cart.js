import React, { Component } from 'react';
import './Cart.css';

class Cart extends Component {
  render() {
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
          <tr> 
            <td>Mark</td> 
            <td>Otto</td> 
            <td>@mdo</td>
            <td><button>Remove</button></td> 
          </tr> 
        </tbody>
      </table>
    )
  }
}

export default Cart;
