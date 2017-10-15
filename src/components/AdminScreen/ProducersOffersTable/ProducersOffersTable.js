import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setStateSomeProducersOffers, saveProducersOffers} from '../../../ducks/AdminScreen';
import LockIcon from 'material-ui/svg-icons/action/lock';
import LockOpenIcon from 'material-ui/svg-icons/action/lock-open';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import HighLightIcon from 'material-ui/svg-icons/action/highlight-off';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import {DatePicker, MenuItem, Popover, Menu, DropDownMenu} from 'material-ui';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import {cyan500, pinkA200} from 'material-ui/styles/colors';
import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/clear';
import {TableRowColumn,} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Table from '../../common/Table/Table';

import './ProducersOffersTable.css';

class ProducersOffersTable extends Component {
  state = {
    filterDate1: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    filterDate2: new Date(),
    popoverOpen: false,
    selectedRows: []
  };

  handleChange = (event, index, value) => this.setState({value});

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

  getFilteredData2() {
    return this.props.data.filter(offer => {
      return this.state.filterDate1.getTime() < offer.deliveryDate && this.state.filterDate2.getTime() > offer.deliveryDate
    })
  }

  onRowSelection = (selectedRows) => {
    this.setState({selectedRows});
  };

  renderItem(value, type, index) {
    switch (type) {
      case 'editable':
        return <TableRowColumn key={index}>{value ? <LockIcon style={{paddingLeft: 'calc(50% - 12px)'}}/> : <LockOpenIcon style={{paddingLeft: 'calc(50% - 12px)'}}/>}</TableRowColumn>;
      case 'state':
        return <TableRowColumn key={index}>{value.toLowerCase() === 'Pendiente'.toLowerCase() ? <InfoIcon style={{paddingLeft: 'calc(50% - 12px)'}}/> : value.toLowerCase() === 'Cancelada'.toLowerCase() ? <HighLightIcon style={{paddingLeft: 'calc(50% - 12px)'}} color={pinkA200}/> : <CheckCircleIcon style={{paddingLeft: 'calc(50% - 12px)'}} color={cyan500}/>}</TableRowColumn>;
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

  render() {
    return (
        <div className="ProducersOffersTable">
          <Table columns={columns} data={this.getFilteredData2()} renderItem={(value, type, index) => this.renderItem(value, type, index)} onRowSelection={this.onRowSelection} selectedRows={this.state.selectedRows}>
            <div>
              <h3>{this.props.name}</h3>
              <RaisedButton
                  style={{display: 'block-inline', float: 'right', marginTop: '3vh', marginRight: '12px', minWidth: '44px'}}
                  onClick={() => this.props.deleteTable(this.props.name)}
                  icon={<RemoveIcon color={pinkA200}/>}
              />
              {this.props.names.length > 0 ?
                  <RaisedButton
                      style={{display: 'block-inline', float: 'right', marginTop: '3vh', marginRight: '12px', minWidth: '44px'}}
                      onClick={this.handleTouchTap}
                      icon={<AddIcon color={cyan500}/>}
                  />
                  :
                  ''
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
          <div className="tableActions">
            <RaisedButton label={"Aceptar Ofertas (" + this.state.selectedRows.length + ")"} primary={true} disabled={this.state.selectedRows.length === 0} style={{float: 'left', margin: '12px'}}
                          onClick={() => {
                            const ids = [];
                            const filteredRows = this.getFilteredData2();
                            this.state.selectedRows.forEach((index) => {
                              ids.push(filteredRows[index].id);
                            });
                            this.props.setStateSomeProducersOffers(ids, 'Aceptada');
                            this.setState({selectedRows: []});
                          }
                          }/>
            <RaisedButton label={"Cancelar Ofertas (" + this.state.selectedRows.length + ")"} secondary={true} disabled={this.state.selectedRows.length === 0} style={{float: 'left', margin: '12px'}}
                          onClick={() => {
                            const ids = [];
                            const filteredRows = this.getFilteredData2();
                            this.state.selectedRows.forEach((index) => {
                              ids.push(filteredRows[index].id);
                            });
                            this.props.setStateSomeProducersOffers(ids, 'Cancelada');
                            this.setState({selectedRows: []});
                          }
                          }/>
            <RaisedButton label="Guardar" primary={true} style={{float: 'right', margin: '12px'}}
                          onClick={() => {
                            const acceptedIds = [];
                            const canceledIds = [];
                            this.props.data.map(offer => {
                              if (offer.editable && offer.state === 'Aceptada')
                                acceptedIds.push({id: offer.id, state: 'Aceptada'});
                              else if (offer.editable && offer.state === 'Cancelada')
                                canceledIds.push({id: offer.id, state: 'Cancelada'})
                            });
                            this.props.saveProducersOffers(acceptedIds, canceledIds);
                          }}/>
            <RaisedButton label="Cancelar" style={{float: 'right', margin: '12px'}}/>
          </div>
        </div>
    );
  }
}

const columns = [
  {name: 'Producto'},
  {name: 'Cantidad'},
  {name: 'Precio'},
  {name: 'Productor'},
  {name: 'Creación'},
  {name: 'Entrega'},
  {name: 'Modificable'},
  {name: 'Estado'},
];

export default connect(null, {setStateSomeProducersOffers, saveProducersOffers})(ProducersOffersTable);