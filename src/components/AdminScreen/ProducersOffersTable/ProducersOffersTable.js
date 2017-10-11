import React, {Component} from 'react';
import {connect} from 'react-redux';

import LockIcon from 'material-ui/svg-icons/action/lock';
import LockOpenIcon from 'material-ui/svg-icons/action/lock-open';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import InfoIcon from 'material-ui/svg-icons/action/info';
import HighlightOffIcon from 'material-ui/svg-icons/action/highlight-off';
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

  getFilteredData() {
    return this.props.data.filter(row => {
      let approve = false;
      row.forEach(item => {
        if (!approve) {
          for (const property in item) {
            if (item.hasOwnProperty(property) && property === 'filter' && this.state.filterDate1.getTime() < item.data && this.state.filterDate2.getTime() > item.data) {
              approve = true;
              break;
            }
          }
        }
      });
      return approve;
    })
  }

  onRowSelection = (selectedRows) => {
    this.setState({selectedRows});

  };

  renderItem(item, index) {
    switch (item.type) {
      case 'lock':
        return <TableRowColumn key={index}>{item.data ? <LockIcon style={{paddingLeft: 'calc(50% - 12px)'}}/> : <LockOpenIcon style={{paddingLeft: 'calc(50% - 12px)'}}/>}</TableRowColumn>;
      case 'close-check-info':
        return <TableRowColumn key={index}>{item.data === 'Pendiente' ? <InfoIcon style={{paddingLeft: 'calc(50% - 12px)'}}/> : item.data === 'Cancelada' ? <ClearIcon style={{paddingLeft: 'calc(50% - 12px)'}}/> : <HighlightOffIcon style={{paddingLeft: 'calc(50% - 12px)'}}/>}</TableRowColumn>;
      case 'date':
        return <TableRowColumn key={index}>{item.data.toISOString().split('T')[0]}</TableRowColumn>;
      case 'ID':
        break;
      default:
        return <TableRowColumn key={index}>{item.data + ''}</TableRowColumn>
    }
  }

  render() {
    return (
        <div className="ProducersOffersTable">
          <Table columns={columns} data={this.getFilteredData()} renderItem={(item, index) => this.renderItem(item, index)} onRowSelection={this.onRowSelection} selectedRows={this.state.selectedRows}>
            <div>
              <h3>{this.props.name}</h3>
              <RaisedButton
                  style={{display:'block-inline',float:'right',marginTop:'3vh', marginRight:'12px',minWidth:'44px'}}
                  onClick={()=>this.props.deleteTable(this.props.name)}
                  icon={<RemoveIcon color={pinkA200}/>}
              />
              <RaisedButton
                  style={{display:'block-inline',float:'right',marginTop:'3vh', marginRight:'12px',minWidth:'44px'}}
                  onClick={this.handleTouchTap}
                  icon={<AddIcon color={cyan500}/>}
              />
              <Popover
                  open={this.state.popoverOpen}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  onRequestClose={this.handleRequestClose}
              >
                <Menu>
                  {this.props.names.map((name, index)=>{
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
                            console.log('Button works! :D');
                            this.setState({selectedRows:[]});
                          }
                          }/>
            <RaisedButton label={"Cancelar Ofertas (" + this.state.selectedRows.length + ")"} secondary={true} disabled={this.state.selectedRows.length === 0} style={{float: 'left', margin: '12px'}}
                          onClick={() => {
                            console.log('Button works! :D');
                            this.setState({selectedRows:[]});
                          }
                          }/>
            <RaisedButton label="Guardar" primary={true} style={{float: 'right', margin: '12px'}}/>
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

export default ProducersOffersTable;