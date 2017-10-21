import React, {Component} from 'react';
import Group from '../../common/Group/Group';
import Product from '../../common/Product/Product';
import Filters from './Filters/Filters';

import './Products.css';

class Products extends Component {
  render() {
    return (
        <div className="Products">
          <Filters filters={this.props.filters}/>
          <div className="products">
            <Group>
              {this.props.products.filter((product) => {
                const {filters} = this.props;
                if (filters.farm && product.categoria === 'Granja')
                  return true;
                if (filters.fruits && product.categoria === 'Frutas')
                  return true;
                if (filters.vegetables && product.categoria === 'Verduras')
                  return true;
                else
                  return false
              }).map((product, index) => {
                //console.log('product',product);
                return <Product src={product.src} name={product.nombre} category={product.categoria} price={product.precio} unit={product.unidad} key={product.src + index} deliveryDate={product.fechaEntrega} count={product.cantidad} id={product.id}/>
              })}
            </Group>
          </div>
        </div>
    )
  }

}

export default Products;
