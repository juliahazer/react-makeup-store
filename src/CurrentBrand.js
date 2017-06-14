import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import ProductCard from './ProductCard';

class CurrentBrand extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: null,
      brandName: null,
    }
    this.callAPI = this.callAPI.bind(this);
  }

  callAPI(brandName){
    var url = "https://makeup-api.herokuapp.com/api/v1/products.json?brand=" + brandName;
    $.getJSON(url).then((data) => {
      // console.log(data)
      data = data.map((el) => {
        el.price = parseFloat(el.price).toFixed(2)
        return el
      })
      this.setState({
        products: data,
        brandName: brandName
      });  
    })
  }

  componentWillMount(){
    this.callAPI(this.props.match.params.name);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.match.params.name !== this.props.match.params.name){
      this.callAPI(nextProps.match.params.name);
    }
  }

  render(){
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
            addToCart={this.props.addProductCart}
          />
        )
      });
    }
    var brandNameTxt;
    if (this.state.brandName !== null){
      brandNameTxt = this.state.brandName.toUpperCase();
    }
    
    return (
      <div className="CurrentBrand">
        <h2>{brandNameTxt}</h2>
        {products}
      </div>
    )
  }
}

export default CurrentBrand;
