import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCustomerOrders, cancelCustomerOrders} from '../../../ducks/AdminScreen';
import LockIcon from 'material-ui/svg-icons/action/lock';
import LockOpenIcon from 'material-ui/svg-icons/action/lock-open';
import MoneyIcon from 'material-ui/svg-icons/editor/monetization-on';
import ReactTooltip from 'react-tooltip';
import HighLightIcon from 'material-ui/svg-icons/action/highlight-off';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import {DatePicker, MenuItem, Popover, Menu, DropDownMenu} from 'material-ui';
import {cyan500, pinkA200, green500} from 'material-ui/styles/colors';
import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/clear';
import {TableRowColumn,} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Table from '../../common/Table/Table';

import './CustomersOrdersTable.css'

class CustomersOrdersTable extends Component {

  state = {
    filterDate1: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    filterDate2: new Date(),
    popoverOpen: false,
    selectedRows: [],
    idProductNewOffer: '1',
    amountNewOffer: '5',
    priceNewOffer: '2000',
    deliveryDateNewOffer: Date.now(),
    expanded: false
  };

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      popoverOpen: true,
      anchorEl: event.currentTarget,
    });
  };
  handleRequestClose = (newTable) => {
    this.setState({
      popoverOpen: false,
    });
    this.props.addTable(newTable);
  };

  onRowSelection = (selectedRows) => {
    this.setState({selectedRows});
  };

  getFilteredData() {
    return this.props.data.filter(item => {
      return this.state.filterDate1.getTime() < item.deliveryDate && this.state.filterDate2.getTime() > item.deliveryDate
    })
  }


  renderItem(value, type, index) {
    switch (type) {
      case 'editable':
        return <TableRowColumn key={index}>{value ? <LockIcon style={{paddingLeft: 'calc(50% - 12px)'}}/> : <LockOpenIcon style={{paddingLeft: 'calc(50% - 12px)'}}/>}</TableRowColumn>;
      case 'state':
        return <TableRowColumn key={index}>{this.getIcon(value)}</TableRowColumn>;
      case 'createdAt':
        return <TableRowColumn key={index}>{value.toISOString().split('T')[0]}</TableRowColumn>;
      case 'deliveryDate':
        return <TableRowColumn key={index}>{value.toISOString().split('T')[0]}</TableRowColumn>;
      case 'id':
        break;
      default:
        return <TableRowColumn key={index}>{value + ''}</TableRowColumn>
    }
  }

  getIcon(value) {
    switch (value.toLowerCase()) {
      case 'pendiente':
        return <div><InfoIcon style={{paddingLeft: 'calc(50% - 12px)'}} data-tip={'Pendiente'}/><ReactTooltip place="right" type="dark" effect="float"/></div>;
      case 'cancelada':
        return <div><HighLightIcon style={{paddingLeft: 'calc(50% - 12px)'}} color={pinkA200} data-tip={'Cancelada'}/><ReactTooltip place="right" type="dark" effect="float"/></div>;
      case 'aceptada':
        return <div><CheckCircleIcon style={{paddingLeft: 'calc(50% - 12px)'}} color={cyan500} data-tip={'Aceptada'}/><ReactTooltip place="right" type="dark" effect="float"/></div>;
      case 'pagada':
        return <div><MoneyIcon style={{paddingLeft: 'calc(50% - 12px)'}} color={green500} data-tip={'Pagada'}/><ReactTooltip place="right" type="dark" effect="float"/></div>;
      default:
        return <div><InfoIcon style={{paddingLeft: 'calc(50% - 12px)'}} data-tip={'Pendiente'}/><ReactTooltip place="right" type="dark" effect="float"/></div>;
    }

  }

  createOffer = async() => {
    const {idProductNewOffer, amountNewOffer, priceNewOffer, deliveryDateNewOffer} = this.state;
    const idProducer = '1';
    const unit = 'Libra';
    const createdAt = Date.now();
    const offer = {idProductNewOffer, amountNewOffer, priceNewOffer, deliveryDateNewOffer, idProducer, unit, createdAt};
    await this.props.createAdminOffer(offer);
    this.props.fetchAdminOffers();
  };

  componentWillMount() {
    this.props.fetchCustomerOrders()
  }

  render() {
    return (
        <div className="CustomersOrdersTable">
          <Table expanded={this.state.expanded} columns={columns} data={this.props.customersOrders} renderItem={(value, type, index) => this.renderItem(value, type, index)} onRowSelection={this.onRowSelection} selectedRows={this.state.selectedRows}>
            <div>
              <h3>{this.props.name}</h3>

              {this.state.expanded ?
                  <RaisedButton
                      style={{display: 'block-inline', float: 'right', marginTop: '3vh', marginRight: '12px', minWidth: '44px'}}
                      // onClick={() => this.props.deleteTable(this.props.name)}
                      onClick={() => this.setState({expanded: false})}
                      icon={<RemoveIcon color={pinkA200}/>}
                      data-tip="Minimizar Tabla"
                  >
                  </RaisedButton>
                  :
                  <RaisedButton
                      style={{display: 'block-inline', float: 'right', marginTop: '3vh', marginRight: '12px', minWidth: '44px'}}
                      // onClick={this.handleTouchTap}
                      onClick={() => this.setState({expanded: true})}
                      icon={<AddIcon color={cyan500}/>}
                      data-tip="Expandir Tabla"
                  >
                  </RaisedButton>
              }

              <Popover
                  open={this.state.popoverOpen}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  onRequestClose={this.handleRequestClose}
              >
                <Menu>
                  {this.props.names.map((name, index) => {
                    return <MenuItem primaryText={name} onClick={() => this.handleRequestClose(name)} key={index}/>
                  })}
                </Menu>
              </Popover>

              <DatePicker className='DatePicker' name='filterDate1' value={this.state.filterDate1}
                          onChange={(event, date) => {
                            this.setState({filterDate1: date})
                          }}
              />
              <span> - </span>
              <DatePicker className='DatePicker' name='filterDate2' value={this.state.filterDate2}
                          onChange={(event, date) => {
                            this.setState({filterDate2: date})
                          }}
              />
            </div>
          </Table>
          {this.state.expanded ?
              <div className="tableActions">
                <RaisedButton label={"Cancelar Pedidos (" + this.state.selectedRows.length + ")"} secondary={true} disabled={this.state.selectedRows.length === 0} style={{float: 'left', margin: '12px'}}
                              onClick={() => {
                                const ids = [];
                                this.state.selectedRows.forEach((index) => {
                                  ids.push(this.props.customersOrders[index].id);
                                });
                                this.props.cancelCustomerOrders(ids);
                                this.setState({selectedRows: []});
                              }
                              }/>
              </div>
              :
              ''
          }
        </div>
    );
  }
}
const columns = [
  {name: 'Producto'},
  {name: 'Cantidad'},
  {name: 'Unidad'},
  {name: 'Precio'},
  {name: 'Entrega'},
  {name: 'Cliente'},
  {name: 'Telefono'},
  {name: 'Estado'}
];

function mapStateToProps(state) {
  //console.log(state);
  const {customersOrders} = state.AdminScreen;
  return {
    customersOrders
  }
}

export default connect(mapStateToProps, {fetchCustomerOrders, cancelCustomerOrders})(CustomersOrdersTable);