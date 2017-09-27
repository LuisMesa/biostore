import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getRecentProducts} from '../../ducks/HomeScreen';
import Banner from './Banner/Banner';
import CategoryRow from './CategoryRow/CategoryRow';
import Frequent from './Frequent/Frequent';

class HomeScreen extends Component {

  componentWillMount(){
    this.props.getRecentProducts();
  }

  render() {
    return (
        <div className="HomeScreen">
          <Banner/>
          <CategoryRow categories={categories}/>
          <Frequent/>
        </div>
    )
  }
}

const categories = [
  {title:'Frutas',subtitle:'Uva, Manzana, Piña, Kiwi, ...',src:'./img/category1.jpg'},
  {title:'Verduras',subtitle:'Cebolla, Espinaca, Cilantro, Apio, ...',src:'./img/category2.jpg'},
  {title:'Granja',subtitle:'Huevos, Miel, Queso, Harina, ...',src:'./img/category3.jpg'},
];

export default connect(null, {getRecentProducts})(HomeScreen);