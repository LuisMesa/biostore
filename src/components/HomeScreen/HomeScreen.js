import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchRecentProducts} from '../../ducks/HomeScreen';
import {createOrder} from '../../ducks/common';
import Banner from './Banner/Banner';
import CategoryRow from './CategoryRow/CategoryRow';
import Frequent from './Frequent/Frequent';
import Cart from '../common/Cart/Cart';

class HomeScreen extends Component {

  componentWillMount(){
    this.props.fetchRecentProducts();
  }
  buy = ()=>{
    const array = this.props.cartProducts.map((product =>{
      // console.log(product);
      return {offer_id:product.id, count: product.amount, idProducer:'1'}
    }));
    this.props.createOrder(1,'dirección', 1231234, [{offer_id:1, count: 5, idProducer:'1'},{offer_id:2,count:3, idProducer:'2'},]);
  };

  render() {
    return (
        <div className="HomeScreen">
          <Banner/>
          <CategoryRow categories={categories}/>
          <Frequent products = {this.props.products}/>
          <Cart products = {this.props.cartProducts} buy = {this.buy}/>
        </div>
    )
  }
}

const categories = [
  {title:'Frutas',subtitle:'Uva, Manzana, Piña, Kiwi, ...',src:'./img/category1.jpg'},
  {title:'Verduras',subtitle:'Cebolla, Espinaca, Cilantro, Apio, ...',src:'./img/category2.jpg'},
  {title:'Granja',subtitle:'Huevos, Miel, Queso, Harina, ...',src:'./img/category3.jpg'},
];


function mapStateToProps(state) {
  const products = state.HomeScreen.recentProducts;
  const cartProducts= state.common.cart.products;
  return {
    products,
    cartProducts
  }
}

export default connect(mapStateToProps, {fetchRecentProducts, createOrder})(HomeScreen);