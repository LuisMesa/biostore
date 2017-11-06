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
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

import './Cart.css';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};

  }

  handleToggle = () => this.setState({open: !this.state.open});

  creditCardPay = () =>{
      alert("Ésta función se encuentra en construcción");
  }

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
                          secondaryText={product.price * product.amount}
                          key={index}
                      >
                        <div className="extraInfo">
                          <div className="quantity">
                            <div className="number">
                              {product.amount}
                            </div>
                            <div className="unit">
                              {getCorrectUnit(product.unit, product.amount)}
                            </div>
                          </div>
                        </div>
                      </ListItem>
                    })}
                  </List>
                  <div className="bottom">

                    <div className="totalPrice">
                      <div className="price">${this.props.products.reduce((a, b) => a + b.price * b.amount, 0)}</div>
                      <div className="title">total</div>
                    </div>
                    <Divider/>
                    <div className="payMethod">
                        <Checkbox
                            id="pagoEfectivo"
                            label="Pago en efectivo"
                        />
                        <Checkbox
                            disabled={true}
                            id="pagoTarjeta"
                            label="Pago con tarjeta de credito"
                            onCheck={ () => this.creditCardPay()}
                        />
                    </div>
                    <Divider/>
                    <div className="buttons">
                        <br/>
                        <FlatButton label="Descartar" secondary={true}/>
                        <FlatButton label="Comprar" primary={true} onClick={() => this.props.buy()}/>
                        <br/>
                    </div>
                  </div>

                </div>
              </Drawer>

          {this.props.products.length > 0 ?
          <Badge className="Badge" badgeContent={this.props.products.length} primary={true} style={styles.button}>
            <FloatingActionButton onClick={() => {
              this.handleToggle()
            }}>
              <ShoppingCartIcon />
            </FloatingActionButton>
          </Badge>
              :
              ''
          }
        </div>

    )
        ;
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
