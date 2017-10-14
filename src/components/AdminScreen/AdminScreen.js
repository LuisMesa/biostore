import React, {Component} from 'react'
import {connect} from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import ProducersOffersTable from './ProducersOffersTable/ProducersOffersTable';
import AdminOffersTable from './AdminOffersTable/AdminOffersTable';
import CustomersOrdersTable from './CustomersOrdersTable/CustomersOrdersTable';
import {fetchProducersOffers, deleteNotification} from '../../ducks/AdminScreen';

import './AdminScreen.css';

class AdminScreen extends Component {
  state = {
    producersOffersTable: true,
    adminOffersTable: false,
    // producersOrdersTable: true,
    customersOrdersTable: false,
    openSnackBar: false,
    idProductNewOffer: '1',
    amountNewOffer: '5',
    priceNewOffer: '2000',
    deliveryDateNewOffer: Date.now()
  };

  handleRequestCloseSnackBar = () => {
    this.setState({
      openSnackBar: false,
    });
    if (this.props.notifications.length > 0) {
      this.props.deleteNotification();
    }
  };

  addTable = (newTable) => {
    switch (newTable) {
      case names[0]: {
        this.setState({producersOffersTable: true});
        break;
      }
      case names[1]: {
        this.setState({adminOffersTable: true});
        break;
      }
      case names[2]: {
        this.setState({producersOrdersTable: true});
        break;
      }
      case names[3]: {
        this.setState({customersOrdersTable: true});
        break;
      }
      default: {
        break;
      }
    }
  };

  deleteTable = (tableName) => {
    switch (tableName) {
      case names[0]: {
        this.setState({producersOffersTable: false});
        break;
      }
      case names[1]: {
        this.setState({adminOffersTable: false});
        break;
      }
      case names[2]: {
        this.setState({producersOrdersTable: false});
        break;
      }
      case names[3]: {
        this.setState({customersOrdersTable: false});
        break;
      }
      default: {
        break;
      }
    }
  };

  getAvailableNames = () => {
    const availableNames = [];
    if (!this.state.producersOffersTable)
      availableNames.push(names[0]);
    if (!this.state.adminOffersTable)
      availableNames.push(names[1]);
    if (!this.state.producersOrdersTable)
      availableNames.push(names[2]);
    if (!this.state.customersOrdersTable)
      availableNames.push(names[3]);
    return availableNames;
  };


  componentWillMount() {
    this.props.fetchProducersOffers();
  }

  render() {
    return (
        <div className="AdminScreen">
          {this.state.producersOffersTable ? <ProducersOffersTable data={this.props.producersOffers} names={this.getAvailableNames()} addTable={this.addTable} name={names[0]} deleteTable={this.deleteTable}/> : ''}
          {this.state.adminOffersTable ? <AdminOffersTable names={this.getAvailableNames()} addTable={this.addTable} name={names[1]} deleteTable={this.deleteTable}/> : ''}
          {this.state.customersOrdersTable ? <CustomersOrdersTable names={this.getAvailableNames()} addTable={this.addTable} name={names[2]} deleteTable={this.deleteTable}/> : ''}
          {/*{this.state.producersOrdersTable ? <ProducersOffersTable data={this.props.customersOrders} names={this.getAvailableNames()} addTable={this.addTable} name={names[3]} deleteTable={this.deleteTable}/> : ''}*/}


          <Snackbar
              open={this.state.openSnackBar}
              message={this.props.notifications[0]?this.props.notifications[0]:''}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestCloseSnackBar}
          />
        </div>
    );
  }
}
const names = [
  'Ofertas de Productores',
  'Ofertas del Admin',
  // 'Pedidos a Productores',
  'Pedidos de Clientes'
];

function mapStateToProps(state) {
  const {producersOffers, adminOffers, producersOrders, customersOrders, notifications} = state.AdminScreen;
  return {
    producersOffers,
    adminOffers,
    producersOrders,
    customersOrders,
    notifications
  }
}

export default connect(mapStateToProps, {fetchProducersOffers, deleteNotification})(AdminScreen);