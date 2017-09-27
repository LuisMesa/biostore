import React, {Component} from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Close from 'material-ui/svg-icons/navigation/close';
import Avatar from 'material-ui/Avatar';

import './Cart.css';

const products = [
  {src: './img/items/manzana.jpg', nombre: 'Manzana', categoria: 'Frutas', precio: '2500', unidad: 'Libra'},
  {src: './img/items/arveja.jpg', nombre: 'Arveja', categoria: 'Verduras', precio: '2500', unidad: 'Libra'},
  {src: './img/items/huevo.jpg', nombre: 'Huevo', categoria: 'Granja', precio: '300', unidad: 'Unidad'},
  {src: './img/items/durazno.jpg', nombre: 'Durazno', categoria: 'Frutas', precio: '2500', unidad: 'Libra'},
];

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});


  render() {
    return (
        <div className="Cart">
          <Drawer docked={false} openSecondary={true} width={300} onRequestChange={(open) => this.setState({open})} open={this.state.open} >
            <div className="cartDrawer">
              <div className="title">Carrito</div>
              <Divider/>
              <List className="list">
                {products.map((product,index)=>{
                  return <ListItem
                      className="cartItem"
                      leftAvatar={<Avatar src={product.src} />}
                      rightIcon={<Close/>}
                      primaryText={product.nombre}
                      secondaryText={product.precio}
                      key={index}
                  >
                    <div className="extraInfo">
                      <div className="quantity">
                        <div className="number">
5
                        </div>
                        <div className="unit">
Lb
                        </div>
                      </div>
                    </div>
                  </ListItem>
                })}
              </List>
              <div className="bottom">

                <div className="totalPrice">
                  <Divider/>
                  <div className="price">$154000</div>
                  <div className="title">total</div>
                </div>
                <Divider/>
                <div className="buttons">
                  <FlatButton label="Descartar" secondary={true} />
                  <FlatButton label="Comprar" primary={true} />
                </div>
              </div>

            </div>
          </Drawer>
          <FloatingActionButton style={styles.button} onClick={()=>{this.handleToggle()}}>
            <ShoppingCartIcon />
          </FloatingActionButton>
        </div>
    );
  }
}

const styles ={
  button:{
    position:'fixed',
    bottom:'20px',
    right:'20px',
    zIndex:'100'
  }
};

export default Cart;
