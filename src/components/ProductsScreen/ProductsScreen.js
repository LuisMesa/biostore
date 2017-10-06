import React, {Component} from 'react'
import {connect} from 'react-redux';
import Products from './Products/Products';
import Cart from '../common/Cart/Cart';

import './ProductsScreen.css';
const products = [
  {src: './img/items/manzana.jpg', nombre: 'Manzana', categoria: 'Frutas', precio: '2500', unidad: 'Libra'},
  {src: './img/items/arveja.jpg', nombre: 'Arveja', categoria: 'Verduras', precio: '2500', unidad: 'Libra'},
  {src: './img/items/huevo.jpg', nombre: 'Huevo', categoria: 'Granja', precio: '300', unidad: 'Unidad'},
  {src: './img/items/durazno.jpg', nombre: 'Durazno', categoria: 'Frutas', precio: '2500', unidad: 'Libra'},
  {src: './img/items/frambuesa.jpg', nombre: 'Frambuesa', categoria: 'Frutas', precio: '4000', unidad: 'Libra'},
  {src: './img/items/queso.jpg', nombre: 'Queso', categoria: 'Granja', precio: '2500', unidad: 'Libra'},
  {src: './img/items/ciruela.jpg', nombre: 'Ciruela', categoria: 'Frutas', precio: '1000', unidad: 'Libra'},
  {src: './img/items/papa.jpg', nombre: 'Papa', categoria: 'Verduras', precio: '500', unidad: 'Libra'},
  {src: './img/items/pera.jpg', nombre: 'Pera', categoria: 'Frutas', precio: '1500', unidad: 'Libra'},
];

class ProductsScreen extends Component {
  render() {
    return (
        <div className="ProductsScreen">
          <Products products = {products} filters={this.props.filters}/>
          <Cart products = {this.props.products}/>
        </div>
    );
  }
}
function mapStateToProps(state){
  const {products}= state.common.cart;
  const {filters} = state.ProductsScreen;
  return{
    products,
    filters
  }
}

export default connect(mapStateToProps)(ProductsScreen);