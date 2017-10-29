import React, {Component} from 'react';
import {getCorrectUnit} from '../../../../others/usefulFunctions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton} from 'material-ui/RadioButton';
import ReactTooltip from 'react-tooltip';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import Slider from 'material-ui/Slider';
import AddShoppingCartIcon from 'material-ui/svg-icons/action/add-shopping-cart';
import DoneIcon from 'material-ui/svg-icons/action/done';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';
import ProducersInfo from './ProducersInfo/ProducersInfo';
import './ProductDetail.css';

class ProductDetail extends Component {
  state = {
    buying: true,
    slider: Math.floor(Math.random() * 50) + 1,
  };

  onClickCartButton = () => {
    this.setState({buying: true})
  };

  onClickDoneButton = () => {
    this.setState({buying: false});

    const {src, name, category, unit, price, id} = this.props.product;
    const product = {src, name, category, unit, price, amount: this.state.slider, id};
    this.props.addProductToCart(product);
  };

  onChangeSlider = (event, value) => {
    this.setState({slider: value})
  };

  render() {
    const {description} = this.props.product;

    const actions = [];
    //<FlatButton
    //    label="Cerrar"
    //    primary={true}
    //    onClick={this.props.handleClose}
    ///>,
    // ];

    return (
        <Dialog className='ProductDetail'
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.handleClose}
                autoScrollBodyContent={true}
                bodyStyle={styles.Dialog}
                autoDetectWindowHeight
        >
          <Card className="Product" style={styles.Card}>
            <CardMedia className="CardMedia"
                       overlay={
                         <CardTitle className="CardTitle" title={this.props.product.name} subtitle={this.props.product.category} onClick={this.openDetail}>
                           <InfoIcon className="InfoIcon tooltip" data-tip={'Entrega: ' + new Date(this.props.product.deliveryDate ? this.props.product.deliveryDate : Date.now()).toISOString().split('T')[0] + '<br>' + 'Quedan: ' + this.props.product.count + ' ' + getCorrectUnit(this.props.product.unit, this.props.product.count)}>
                           </InfoIcon>
                           <ReactTooltip place="left" type="dark" effect="float" multiline={true} style={{fontSize: '10px'}}/>
                         </CardTitle>}
            >
              <img src={this.props.product.src} alt={this.props.product.name}/>
            </CardMedia>
            <CardTitle className="CardTitle" style={styles.cardTitle}
                       title={this.state.buying ? this.state.slider + ' ' + getCorrectUnit(this.props.product.unit, this.state.slider) : '$' + this.props.product.price + ' /'}
                       subtitle={this.state.buying ? '$' + this.state.slider * this.props.product.price : this.props.product.unit}/>
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
          <div className="details">
            <div className="description">
              <h3>Descripción</h3>
              <p>{description}</p>
            </div>
            <ProducersInfo/>
          </div>
        </Dialog>
    );

  }
}

const styles = {
  Dialog: {
    padding: 0,
    height: '50vh',
    display:'flex',

  },
  cardTitle: {
    display: 'inline-block',
    paddingTop: '0',
    paddingBottom: '0'
  },
  titleStyle: {
    fontSize: '2vw'
  },
};

export default ProductDetail;