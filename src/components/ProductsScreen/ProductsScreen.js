import React, {Component} from 'react'
import {connect} from 'react-redux';
import Products from './Products/Products';
import Cart from '../common/Cart/Cart';

import './ProductsScreen.css';
class ProductsScreen extends Component {
  render() {
    return (
        <div className="ProductsScreen">
          <Products/>
          <Cart products = {this.props.products}/>
        </div>
    );
  }
}
function mapStateToProps(state){
  const products= state.common.cart.products;
  return{
    products
  }
}

export default connect(mapStateToProps)(ProductsScreen);