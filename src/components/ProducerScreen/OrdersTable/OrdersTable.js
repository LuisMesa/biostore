import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchOrders, setStateSomeOrders, saveStateSomeOrders} from '../../../ducks/ProducerScreen';
import LockIcon from 'material-ui/svg-icons/action/lock';
import LockOpenIcon from 'material-ui/svg-icons/action/lock-open';
import MoneyIcon from 'material-ui/svg-icons/editor/monetization-on';
import HighLightIcon from 'material-ui/svg-icons/action/highlight-off';
import ReactTooltip from 'react-tooltip';
import SendedIcon from 'material-ui/svg-icons/communication/call-made';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import {DatePicker, MenuItem, Popover, Menu, DropDownMenu} from 'material-ui';
import {cyan500, pinkA200, green500} from 'material-ui/styles/colors';
import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/clear';
import {TableRowColumn,} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Table from '../../common/Table/Table';

import './OrdersTable.css';

class OrdersTable extends Component {

  state = {
    filterDate1: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    filterDate2: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
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
    return this.props.orders.filter(item => {
      return this.state.filterDate1.getTime() < item.deliveryDate.getTime() && this.state.filterDate2.getTime() > item.deliveryDate.getTime()
    })
    // return this.props.orders;
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
      // case 'aceptada':
      //   return <div><CheckCircleIcon style={{paddingLeft: 'calc(50% - 12px)'}} color={cyan500} data-tip={'Aceptada'}/><ReactTooltip place="right" type="dark" effect="float"/></div>;
      case 'pagada':
        return <div><MoneyIcon style={{paddingLeft: 'calc(50% - 12px)'}} color={green500} data-tip={'Pagada'}/><ReactTooltip place="right" type="dark" effect="float"/></div>;
      case 'aceptada':
        return <div><SendedIcon style={{paddingLeft: 'calc(50% - 12px)'}} color={cyan500} data-tip={'Enviada'}/><ReactTooltip place="right" type="dark" effect="float"/></div>;
      default:
        return <div><InfoIcon style={{paddingLeft: 'calc(50% - 12px)'}} data-tip={'Pendiente'}/><ReactTooltip place="right" type="dark" effect="float"/></div>;
    }
  }

  createOffer = async () => {
    const {idProductNewOffer, amountNewOffer, priceNewOffer, deliveryDateNewOffer} = this.state;
    const idProducer = '1';
    const unit = 'Libra';
    const createdAt = Date.now();
    const offer = {idProductNewOffer, amountNewOffer, priceNewOffer, deliveryDateNewOffer, idProducer, unit, createdAt};
    await this.props.createOffer(offer);
    this.props.fetchOffers();
  };

  componentWillMount() {
    this.props.fetchOrders()
  }

  render() {
    return (
        <div className="OffersTable" id="OffersTable">
          <Table expanded={this.state.expanded} columns={columns} data={this.getFilteredData()} renderItem={(value, type, index) => this.renderItem(value, type, index)} onRowSelection={this.onRowSelection} selectedRows={this.state.selectedRows}>
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
                <RaisedButton label={"Marcar como enviado (" + this.state.selectedRows.length + ")"} primary={true} disabled={this.state.selectedRows.length === 0} style={{float: 'left', margin: '12px'}}
                              onClick={() => {
                                const ids = [];
                                const filteredRows = this.getFilteredData();
                                this.state.selectedRows.forEach((index) => {
                                  ids.push(filteredRows[index].id);
                                });
                                this.props.setStateSomeOrders(ids, 'Aceptada');
                                this.setState({selectedRows: []});
                              }
                              }/>
                <RaisedButton label="Guardar" primary={true} style={{float: 'right', margin: '12px'}}
                              onClick={() => {
                                const acceptedIds = [];
                                const canceledIds = [];
                                this.props.orders.map(order => {
                                  if (order.state === 'Aceptada')
                                    acceptedIds.push({id: order.id, state: 'Aceptada'});
                                  {/*else if (order.editable && order.state === 'Cancelada')*/
                                  }
                                  {/*canceledIds.push({id: order.id, state: 'Cancelada'})*/
                                  }
                                });
                                this.props.saveStateSomeOrders(acceptedIds, canceledIds);
                              }}/>
                <RaisedButton label="Cancelar" style={{float: 'right', margin: '12px'}}/>
                {/*<RaisedButton label="Actualizar" primary={true} style={{float: 'right', margin: '12px'}}*/}
                {/*onClick={()=>this.props.fetchOrders()}/>*/}
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
  {name: 'Precio'},
  {name: 'Entrega'},
  {name: 'Lugar Entrega'},
  {name: 'Estado'}
];

function mapStateToProps(status) {
  const {orders} = status.ProducerScreen;
  return {
    orders
  }
}

export default connect(mapStateToProps, {fetchOrders, setStateSomeOrders, saveStateSomeOrders})(OrdersTable);