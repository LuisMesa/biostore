import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addProductToCart} from '../../../ducks/common';
import {getCorrectUnit} from '../../../others/usefulFunctions';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Slider from 'material-ui/Slider';
import AddShoppingCartIcon from 'material-ui/svg-icons/action/add-shopping-cart';
import DoneIcon from 'material-ui/svg-icons/action/done';

import './Product.css';

class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buying: false,
      slider: Math.floor(Math.random() * 50) + 1
    }
  }

  onClickCartButton = () => {
    this.setState({buying: true})
  };

  onClickDoneButton = () => {
    this.setState({buying: false});
    const {src, name, category, unit, price} =this.props;
    const product = {src, name, category, unit, price, amount: this.state.slider};
    this.props.addProductToCart(product);
  };

  onChangeSlider = (event, value) => {
    this.setState({slider: value})
  };


  render() {
    return (
        <Card className="Product">
          <CardMedia className="CardMedia"
                     overlay={<CardTitle className="CardTitle" title={this.props.name} subtitle={this.props.category}/>}
          >
            <img src={this.props.src} alt={this.props.name}/>
          </CardMedia>
          <CardTitle className="CardTitle" style={styles.cardTitle}
                     title={this.state.buying ? this.state.slider + ' ' + getCorrectUnit(this.props.unit, this.state.slider) : '$' + this.props.price + ' /'}
                     subtitle={this.state.buying ? '$' + this.state.slider * this.props.price : this.props.unit}/>
          <CardActions className="CardActions">
            {this.state.buying ?
                <FlatButton icon={<DoneIcon/>} primary={true} fullWidth={true}
                            onClick={this.onClickDoneButton}
                />
                :
                <FlatButton icon={<AddShoppingCartIcon/>} primary={true} fullWidth={true}
                            onClick={this.onClickCartButton}
                />}

          </CardActions>
          {this.state.buying ? <Slider className="Slider" min={1} max={50}
                                       onChange={this.onChangeSlider}
                                       step={1}
                                       defaultValue={this.state.slider}
              /> : ''}
        </Card>
    )
  }
}

const styles = {
  cardTitle: {
    display: 'inline-block',
    paddingTop: '0',
    paddingBottom: '0'
  },
  titleStyle: {
    fontSize: '2vw'
  },
};

export default connect(null, {addProductToCart})(Product);
