import React, {Component} from 'react'
import {connect} from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import OffersTable from'./OffersTable/OffersTable';
import './ProducerScreen.css';

class ProducerScreen extends Component {
  state = {
    offersTable: true,
    ordersTable: false,
    openSnackBar: false,
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
        this.setState({offersTable: true});
        break;
      }
      case names[1]: {
        this.setState({ordersTable: true});
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
        this.setState({offersTable: false});
        break;
      }
      case names[1]: {
        this.setState({ordersTable: false});
        break;
      }
      default: {
        break;
      }
    }
  };
  getAvailableNames = () => {
    const availableNames = [];
    if (!this.state.offersTable)
      availableNames.push(names[0]);
    if (!this.state.ordersTable)
      availableNames.push(names[1]);
    return availableNames;
  };

  render() {
    return (
        <div className="ProducerScreen">
          {this.state.offersTable ? <OffersTable name={names[0]} names={this.getAvailableNames()} addTable={this.addTable} deleteTable={this.deleteTable} /> : ''}
          {this.state.ordersTable ? <OffersTable name={names[1]} names={this.getAvailableNames()} addTable={this.addTable} deleteTable={this.deleteTable} /> : ''}
          {/*<Snackbar*/}
              {/*open={this.state.openSnackBar}*/}
              {/*message={this.props.notifications[0]?this.props.notifications[0]:''}*/}
              {/*autoHideDuration={4000}*/}
              {/*onRequestClose={this.handleRequestCloseSnackBar}*/}
          {/*/>*/}
        </div>
    );
  }
}
const names = [
  'Ofertas',
  'Pedidos',
];

function mapStateToProps(state) {
  const {offers} = state.ProducerScreen;
  return {
    offers
  }
}
export default connect(mapStateToProps, {})(ProducerScreen);