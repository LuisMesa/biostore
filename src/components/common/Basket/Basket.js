import React, {Component} from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import AddShoppingCartIcon from 'material-ui/svg-icons/action/add-shopping-cart';

import './Basket.css';

class Basket extends Component {
  render() {
    return (
        <Card className="Basket">
          <CardMedia className="CardMedia"
              overlay={<CardTitle className="CardTitle" title={this.props.name} subtitle={this.props.category}/>}
          >
            <img src={this.props.src} alt={this.props.name}/>
          </CardMedia>
          <CardTitle className="CardTitle" style={styles.cardTitle} title={'$' + this.props.price + ' /'} subtitle={this.props.unit}/>
          <CardActions className="CardActions">
            <FlatButton icon={<AddShoppingCartIcon/>} primary={true} fullWidth={true}/>
          </CardActions>
        </Card>
    )
  }
}

const styles = {
  cardTitle: {
    display:'inline-block',
    paddingTop:'0',
    paddingBottom:'0'
  },
  titleStyle:{
    fontSize:'2vw'
  }
};

export default Basket;
