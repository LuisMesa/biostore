import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addProductToCart, changeProductDetail} from '../../../ducks/common';
import {getCorrectUnit} from '../../../others/usefulFunctions';
import ReactTooltip from 'react-tooltip';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Slider from 'material-ui/Slider';
import AddShoppingCartIcon from 'material-ui/svg-icons/action/add-shopping-cart';
import DoneIcon from 'material-ui/svg-icons/action/done';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';
import ProductDetail from './ProductDetail/ProductDetail';

import './Product.css';

class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buying: false,
      slider: Math.floor(Math.random() * 50) + 1,
      detailOpen: false
    }
  }

  openDetail = () => {
    this.setState({detailOpen: true});
  };

  closeDetail = () => {
    this.setState({detailOpen: false});
  };

  onClickCartButton = () => {
    this.setState({buying: true})
  };

  onClickDoneButton = () => {
    this.setState({buying: false});

    const {src, name, category, unit, price, id} =this.props;
    const product = {src, name, category, unit, price, amount: this.state.slider, id};
    this.props.addProductToCart(product);
  };

  onChangeSlider = (event, value) => {
    this.setState({slider: value})
  };


  render() {
    const {src, name, category, unit, price, id, count, description} = this.props;
    return (
        <Card className="Product">
          <CardMedia className="CardMedia"
                     overlay={
                       <CardTitle className="CardTitle" title={this.props.name} subtitle={this.props.category} onClick={this.openDetail}>
                         <InfoIcon className="InfoIcon tooltip" data-tip={'Entrega: '+new Date(this.props.deliveryDate?this.props.deliveryDate:Date.now()).toISOString().split('T')[0] +'<br>' +'Quedan: ' +this.props.count+' '+getCorrectUnit(this.props.unit, this.props.count)}>
                         </InfoIcon>
                         <ReactTooltip place="left" type="dark" effect="float" multiline={true} style={{fontSize:'10px'}}/>
                       </CardTitle>}
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
          <ProductDetail handleClose={this.closeDetail} open = {this.state.detailOpen} product={{src, name, category, unit, price, id, count, description}}/>
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
