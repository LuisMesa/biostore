import React, {Component} from 'react';
import Title from '../../common/Title/Title';
import Group from '../../common/Group/Group';
import Product from '../../common/Product/Product';

import './Frequent.css';
const products = [
  {src: './img/items/manzana.jpg', nombre: 'Manzana', categoria: 'Frutas', precio: '2500', unidad: 'Libra'},
  {src: './img/items/arveja.jpg', nombre: 'Arveja', categoria: 'Verduras', precio: '2500', unidad: 'Libra'},
  {src: './img/items/huevo.jpg', nombre: 'Huevo', categoria: 'Granja', precio: '300', unidad: 'Unidad'},
  {src: './img/items/durazno.jpg', nombre: 'Durazno', categoria: 'Frutas', precio: '2500', unidad: 'Libra'},
  {src: './img/items/frambuesa.jpg', nombre: 'Frambuesa', categoria: 'Frutas', precio: '4000', unidad: 'Libra'},
  {src: './img/items/queso.jpg', nombre: 'Queso', categoria: 'Granja', precio: '2500', unidad: 'Libra'},
  {src: './img/items/ciruela.jpg', nombre: 'Ciruela', categoria: 'Frutas', precio: '1000', unidad: 'Libra'},
  {src: './img/items/papa.jpg', nombre: 'Papa', categoria: 'Vegetales', precio: '500', unidad: 'Libra'},
  {src: './img/items/pera.jpg', nombre: 'Pera', categoria: 'Frutas', precio: '1500', unidad: 'Libra'},
    ];
const canastas = [
  {src: './img/items/manzana.jpg', nombre: 'Manzana', categoria: 'Frutas', precio: '2500', unidad: 'Libra'},
  {src: './img/items/arveja.jpg', nombre: 'Arveja', categoria: 'Verduras', precio: '2500', unidad: 'Libra'},
  {src: './img/items/huevo.jpg', nombre: 'Huevo', categoria: 'Granja', precio: '300', unidad: 'Unidad'},

];

class Frequent extends Component {
  render() {
    return (
        <div className="Frequent">
          <div className="FrequentProducts">
            <Title title="Productos Frecuentes"/>
            <Group>
              {products.map((product,index) => {
                return <Product src={product.src} name={product.nombre} category={product.categoria} price={product.precio} unit={product.unidad} key={product.src+index}/>
              })}
            </Group>
          </div>
          <div className="FrequentBaskets">
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

export default Frequent;
