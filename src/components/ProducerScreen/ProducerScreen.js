import React, {Component} from 'react'
import {connect} from 'react-redux';
import {createOffer} from '../../ducks/ProducerScreen';
import FlatButton from 'material-ui/FlatButton';
import './ProducerScreen.css';

class ProducerScreen extends Component {
  state = {
    idProductNewOffer: '1',
    amountNewOffer: '5',
    priceNewOffer: '2000',
    deliveryDateNewOffer: Date.now()
  };

  createOffer = () => {
    const {idProductNewOffer, amountNewOffer, priceNewOffer, deliveryDateNewOffer} = this.state;
    const idProducer = '1';
    const unit = 'Libra';
    const createdAt = Date.now();
    const offer = {idProductNewOffer, amountNewOffer, priceNewOffer, deliveryDateNewOffer, idProducer, unit, createdAt};
    this.props.createOffer(offer);
  };

  render() {
    return (
        <div className="ProducerScreen">
          ProducerScreen
          <FlatButton label='Nueva Oferta' onClick={this.createOffer}/>
        </div>
    );
  }
}
function mapStateToProps(state){
  const {offers} = state;
  return{
    offers
  }
}
export default connect(mapStateToProps, {createOffer})(ProducerScreen);