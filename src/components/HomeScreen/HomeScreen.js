import React, {Component} from 'react';
import Banner from './Banner/Banner';
import CategoryRow from './CategoryRow/CategoryRow';
import Frequent from './Frequent/Frequent';

class HomeScreen extends Component {
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

export default HomeScreen;