import React, {Component} from 'react'
import {connect} from 'react-redux';
import {createOrder} from '../../ducks/common';
import {fetchOffers} from '../../ducks/ProductsScreen';
import Products from './Products/Products';
import Cart from '../common/Cart/Cart';

import './ProductsScreen.css';

class ProductsScreen extends Component {

  componentWillMount() {
    this.props.fetchOffers();
  }

  buy = ()=>{
    const array = this.props.products.map((product =>{
      return {offer_id:1, count: 5, idProducer:'1'}
    }));
    this.props.createOrder(1,'dirección', 1231234, [{offer_id:1, count: 5, idProducer:'1'},{offer_id:2,count:3, idProducer:'2'},]);
  };

  render() {
    // console.log('Offers',this.props.offers);
    return (
        <div className="ProductsScreen">
          <Products products = {this.props.offers} filters={this.props.filters}/>
          <Cart products = {this.props.products} buy = {this.buy}/>
        </div>
    );
  }
}
function mapStateToProps(state){
  // console.log('state',state);
  const {products}= state.common.cart;
  const {offers}= state.ProductsScreen;
  const {filters} = state.ProductsScreen;
  return{
    products,
    filters,
    offers
  }
}

export default connect(mapStateToProps, {createOrder, fetchOffers})(ProductsScreen);