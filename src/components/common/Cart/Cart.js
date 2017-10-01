import React, {Component} from 'react'
import {getCorrectUnit} from '../../../others/usefulFunctions';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Badge from 'material-ui/Badge';
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Close from 'material-ui/svg-icons/navigation/close';
import Avatar from 'material-ui/Avatar';

import './Cart.css';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
        <div className="Cart">
          <Drawer docked={false} openSecondary={true} width={300} onRequestChange={(open) => this.setState({open})} open={this.state.open}>
            <div className="cartDrawer">
              <div className="title">Carrito</div>
              <Divider/>
              <List className="list">
                {this.props.products.map((product, index) => {
                  return <ListItem
                      className="cartItem"
                      leftAvatar={<Avatar src={product.src}/>}
                      rightIcon={<Close/>}
                      primaryText={product.name}
                      secondaryText={product.price}
                      key={index}
                  >
                    <div className="extraInfo">
                      <div className="quantity">
                        <div className="number">
                          {product.amount}
                        </div>
                        <div className="unit">
                          {getCorrectUnit(product.unit,product.amount)}
                        </div>
                      </div>
                    </div>
                  </ListItem>
                })}
              </List>
              <div className="bottom">

                <div className="totalPrice">
                  <div className="price">${this.props.products.reduce((a, b) => a + b.price*b.amount, 0)}</div>
                  <div className="title">total</div>
                </div>
                <Divider/>
                <div className="buttons">
                  <FlatButton label="Descartar" secondary={true}/>
                  <FlatButton label="Comprar" primary={true}/>
                </div>
              </div>

            </div>
          </Drawer>
          <Badge className="Badge" badgeContent={this.props.products.length} primary={true} style={styles.button}>
            <FloatingActionButton  onClick={() => {
              this.handleToggle()
            }}>
              <ShoppingCartIcon />
            </FloatingActionButton>
          </Badge>
        </div>
    );
  }
}

const styles = {
  button: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: '100'
  }
};

export default Cart;
