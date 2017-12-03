import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Snackbar} from 'material-ui';
import {createOrder} from '../../ducks/common';
import {fetchOffers} from '../../ducks/ProductsScreen';
import Products from './Products/Products';
import Cart from '../common/Cart/Cart';

import './ProductsScreen.css';

class ProductsScreen extends Component {

  state={
    openSnackBar:false
  }
  componentWillMount() {
    this.props.fetchOffers(this.props.userPosition);
  }

  buy = () => {
    const array = this.props.products.map((product => {
      return {offer_id: product.id, count: product.amount, idProducer: '1'}
    }));
    // this.props.createOrder(1, 'dirección', 1231234, [{offer_id: 1, count: 5, idProducer: '1'}, {offer_id: 2, count: 3, idProducer: '2'},]);
    this.props.createOrder(1, 'Cll 7a # 5a - 44', (Date.now() + 5 * 24 * 60 * 60 * 1000), array);
    this.setState({openSnackBar:true})
  };

  render() {
    return (
        <div className="ProductsScreen">
          <Products products={this.props.offers} filters={this.props.filters}/>
          <Cart products={this.props.products} buy={this.buy}/>
          <Snackbar
              open={this.state.openSnackBar}
              message='Gracias por tu compra!'
              autoHideDuration={4000}
              onRequestClose={() => this.setState({openSnackBar: false})}
          />
        </div>
    );
  }
}

function mapStateToProps(state) {
  const {products} = state.common.cart;
  const {offers} = state.ProductsScreen;
  const {filters} = state.ProductsScreen;
  const userPosition = state.common.userPosition;
  return {
    products,
    filters,
    offers,
    userPosition
  }
}

export default connect(mapStateToProps, {createOrder, fetchOffers})(ProductsScreen);