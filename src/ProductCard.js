import React, { Component } from 'react';
import './ProductCard.css';

class ProductCard extends Component {
  constructor(props){
    super(props);
    this.add = this.add.bind(this);
  }

  add() {
    return this.props.addToCart(this.props.id, this.props.name, this.props.price);
  }

  render() {
    var colorsArr = null;
    var colorsTxt = "";
    if (this.props.colorsArr.length > 0){
      colorsArr = this.props.colorsArr.map((el, i) => {
        return (
          <div key={i} className="colorBox" style={{background: el.hex_value}}></div>
        )
      })
      colorsTxt = "Colors: "
    }
    var categoryTxt  = null;
    if (this.props.category){
      categoryTxt = "Category: " + this.props.category;
    }
    return (
      <div className="col-xs-4 text-left">
        <h3>{this.props.name}</h3>
        <button 
          onClick={this.add}>
          ${this.props.price}
        </button>
        <p><img src={this.props.image} alt={this.props.name} /></p>
        <p>{categoryTxt}</p>
        {colorsTxt} {colorsArr}
        <p>{this.props.description}</p>
      </div>
    )
  }
}

export default ProductCard;
