import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchOffers, createOffer} from '../../../ducks/ProducerScreen';
import {productsNames, units} from '../../../others/usefulFunctions';
import ReactTooltip from 'react-tooltip';
import LockIcon from 'material-ui/svg-icons/action/lock';
import LockOpenIcon from 'material-ui/svg-icons/action/lock-open';
import HighLightIcon from 'material-ui/svg-icons/action/highlight-off';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import {DatePicker, MenuItem, Popover, Menu, DropDownMenu} from 'material-ui';
import {cyan500, pinkA200} from 'material-ui/styles/colors';
import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/clear';
import {TableRowColumn,} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import Table from '../../common/Table/Table';
import Dialog from '../../common/Dialog/Dialog';

import './OffersTable.css';

class OffersTable extends Component {

  state = {
    filterDate1: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    filterDate2: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    popoverOpen: false,
    selectedRows: [],
    dialogOpen: false,
    idProductNewOffer: 1,
    productNewOffer: '',
    amountNewOffer: 15,
    unitNewOffer: 'Libra',
    priceNewOffer: 2500,
    deliveryDateNewOffer: new Date(Date.now() + 1000*60*60*24*5),
    expanded: true
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

  getFilteredData(data) {
    return data.filter(item => {
      return this.state.filterDate1.getTime() < item.deliveryDate && this.state.filterDate2.getTime() > item.deliveryDate
    })
  }


  renderItem(value, type, index) {
    switch (type) {
      case 'editable':
        return <TableRowColumn key={index}>{value ? <LockIcon style={{paddingLeft: 'calc(50% - 12px)'}}/> : <LockOpenIcon style={{paddingLeft: 'calc(50% - 12px)'}}/>}</TableRowColumn>;
      case 'state':
        return <TableRowColumn key={index}>{value === 'Pendiente' || value === 'PENDIENTE' ? <InfoIcon style={{paddingLeft: 'calc(50% - 12px)'}}/> : value === 'Cancelada' || value === 'CANCELADA' ? <HighLightIcon style={{paddingLeft: 'calc(50% - 12px)'}} color={pinkA200}/> : <CheckCircleIcon style={{paddingLeft: 'calc(50% - 12px)'}} color={cyan500}/>}</TableRowColumn>;
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

  createOffer = async() => {
    const {idProductNewOffer, amountNewOffer, priceNewOffer, deliveryDateNewOffer, unitNewOffer} = this.state;
    const idProducer = '1';
    const unit = unitNewOffer;
    const createdAt = Date.now();
    const offer = {idProductNewOffer, amountNewOffer, priceNewOffer, deliveryDateNewOffer: new Date(deliveryDateNewOffer).getTime(), idProducer, unit, createdAt};
    await this.props.createOffer(offer);
    this.props.fetchOffers();
    this.setState({dialogOpen: false})
  };

  componentWillMount() {
    this.props.fetchOffers()
  }

  render() {
    return (
        <div className="OffersTable">
          <Table expanded={this.state.expanded} columns={columns} data={this.getFilteredData(this.props.offers)} renderItem={(value, type, index) => this.renderItem(value, type, index)} onRowSelection={this.onRowSelection} selectedRows={this.state.selectedRows}>
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
                    <ReactTooltip place="bottom" type="dark" effect="float" multiline={true} style={{fontSize: '10px'}}/>
                  </RaisedButton>
                  :
                  <RaisedButton
                      style={{display: 'block-inline', float: 'right', marginTop: '3vh', marginRight: '12px', minWidth: '44px'}}
                      // onClick={this.handleTouchTap}
                      onClick={() => this.setState({expanded: true})}
                      icon={<AddIcon color={cyan500}/>}
                      data-tip="Expandir Tabla"
                  >
                    <ReactTooltip place="bottom" type="dark" effect="float" multiline={true} style={{fontSize: '10px'}}/>
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
                <RaisedButton label="Crear Oferta" primary={true} style={{float: 'right', margin: '12px'}}
                              onClick={() => this.setState({dialogOpen: true})}/>
                <RaisedButton label="Cancelar" style={{float: 'right', margin: '12px'}}/>
              </div>
              :
              ''
          }
          <Dialog title='Crear Oferta' open={this.state.dialogOpen}
                  handleClose={() => {
                    this.setState({dialogOpen: false})
                  }}
                  actions={[
                    <FlatButton
                        label="Cancel"
                        primary={true}
                        onClick={() => {
                          this.setState({dialogOpen: false})
                        }}
                    />,
                    <FlatButton
                        label="Guardar"
                        primary={true}
                        onClick={this.createOffer}
                    />]}
          >
            <SelectField
                floatingLabelText="Producto"
                value={this.state.idProductNewOffer}
                onChange={(event, index, value) => this.setState({idProductNewOffer: value})}
                maxHeight={200}
            >
              {productsNames.map((name, i) => <MenuItem value={i} key={i} primaryText={name}/>)}
            </SelectField><br />
            <SelectField
                floatingLabelText="Unidad de Medida"
                value={this.state.unitNewOffer}
                onChange={(event, index, value) => this.setState({unitNewOffer: value})}
                maxHeight={200}
            >
              {units.map((name, i) => <MenuItem value={name} key={i} primaryText={name}/>)}
            </SelectField><br />
            <TextField
                hintText="15"
                floatingLabelText="Cantidad"
                value={this.state.amountNewOffer}
                onChange={(event) => {
                  this.setState({amountNewOffer: event.target.value})
                }}
                type='number'
            /><br />
            <TextField
                hintText="2500"
                floatingLabelText="Precio por Unidad"
                value={this.state.priceNewOffer}
                onChange={(event) => {
                  this.setState({priceNewOffer: event.target.value})
                }}
                type='number'
            /><br />
            <DatePicker
                floatingLabelText="Fecha de Entrega"
                value={this.state.deliveryDateNewOffer}
                onChange={(event, date) => {
                  this.setState({deliveryDateNewOffer: date})
                }}
            />
          </Dialog>
        </div>
    );
  }
}
const columns = [
  {name: 'Producto'},
  {name: 'Cantidad'},
  {name: 'Precio'},
  {name: 'Creación'},
  {name: 'Entrega'},
  {name: 'Estado'},
];

function mapStateToProps(status) {
  const {offers} = status.ProducerScreen;
  return {
    offers
  }
}

export default connect(mapStateToProps, {fetchOffers, createOffer})(OffersTable);