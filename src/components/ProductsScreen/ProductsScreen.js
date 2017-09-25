import React, {Component} from 'react'
import Products from './Products/Products';
import Cart from '../common/Cart/Cart';

import './ProductsScreen.css';
class ProductsScreen extends Component {
  render() {
    return (
        <div className="ProductsScreen">
          <Products/>
          <Cart/>
        </div>
    );
  }
}

export default ProductsScreen;