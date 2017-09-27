import React, {Component} from 'react';
import {connect} from 'react-redux';
import Title from '../../common/Title/Title';
import Group from '../../common/Group/Group';
import Product from '../../common/Product/Product';

import './Frequent.css';
const canastas = [
  {src: './img/items/manzana.jpg', nombre: 'Manzana', categoria: 'Frutas', precio: '2500', unidad: 'Libra'},
  {src: './img/items/arveja.jpg', nombre: 'Arveja', categoria: 'Verduras', precio: '2500', unidad: 'Libra'},
  {src: './img/items/huevo.jpg', nombre: 'Huevo', categoria: 'Granja', precio: '300', unidad: 'Unidad'},

];

class Frequent extends Component {
  render() {
    return (
        <div className="Frequent">
          <div className="frequentProducts">
            <Title title="Productos Frecuentes"/>
            <Group>
              {this.props.products.map((product,index) => {
                return <Product src={product.src} name={product.nombre} category={product.categoria} price={product.precio} unit={product.unidad} key={product.src+index}/>
              })}
            </Group>
          </div>
          <div className="frequentBaskets">
            <Title title="Canastas Frecuentes"/>
            <Group>
              {canastas.map((product,index) => {
                return <Product src={product.src} name={product.nombre} category={product.categoria} price={product.precio} unit={product.unidad} key={product.src+index}/>
              })}
            </Group>
          </div>
        </div>
    )
  }

}

function mapStateToProps(state) {
  const products = state.HomeScreen.recentProducts;
  return {
    products
  }
}

export default connect(mapStateToProps)(Frequent);
