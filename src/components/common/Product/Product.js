import React, {Component} from 'react';
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
      slider: Math.floor(Math.random()*50)+1
    }
  }

  onClickCartButton = () => {
    if (this.state.buying)
      this.setState({slider: 0});

    this.setState({buying: true})
  };

  onClickDoneButton = () => {
    this.setState({buying: false})
  };

  onChangeSlider = (event, value) => {
    this.setState({slider: value})
  };

  getCorrectUnit() {
    const {unit} =this.props;
    if (unit.endsWith('a') || unit.endsWith('e') || unit.endsWith('i') || unit.endsWith('o') || unit.endsWith('u'))
      return this.state.slider != 1 ? unit + 's' : unit;
    else
      return this.state.slider != 1 ? unit + 'es' : unit;

  }

  render() {
    return (
        <Card className="Product">
          <CardMedia className="CardMedia"
                     overlay={<CardTitle className="CardTitle" title={this.props.name} subtitle={this.props.category}/>}
          >
            <img src={this.props.src} alt={this.props.name}/>
          </CardMedia>
          <CardTitle className="CardTitle" style={styles.cardTitle}
                     title={this.state.buying ? this.state.slider + ' ' + this.getCorrectUnit(this.props.unit) : '$' + this.props.price + ' /'}
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

export default Product;
