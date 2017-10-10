import React, {Component} from 'react'
import {DatePicker, MenuItem, Popover, Menu, DropDownMenu} from 'material-ui';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import Table from '../common/Table/Table';

import './AdminScreen.css';

class AdminScreen extends Component {

  state = {
    filterDate1: new Date(Date.now() - 6048000100),
    filterDate2: new Date(),
    popoverOpen: false,
    currentTable: 'Ofertas de Productores'

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
      currentTable: newTable
    });
  };


  render() {
    return (
        <div className="AdminScreen">
          <Table columns={columns} data={data}>
            <div>
              <h3 onClick={this.handleTouchTap}>{this.state.currentTable} <ArrowIcon/></h3>
              <Popover
                  open={this.state.popoverOpen}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  onRequestClose={this.handleRequestClose}
              >
                <Menu>
                  <MenuItem primaryText="Ofertas del Admin" onClick={()=>this.handleRequestClose('Ofertas del Admin')}/>
                  <MenuItem primaryText="Pedidos a Productores" onClick={()=>this.handleRequestClose('Pedidos a Productores')}/>
                  <MenuItem primaryText="Pedidos de Clientes" onClick={()=>this.handleRequestClose('Pedidos de Clientes')}/>
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
const data = [
  {product: 'Producto1', amount: '2', price: '34400', producer: 'Productor1', createdAt: '09/10/2017', deliveryAt: '09/10/2017', editable: true, state: 'Pendiente'},
  {product: 'Producto2', amount: '12', price: '44400', producer: 'Productor1', createdAt: '09/10/2017', deliveryAt: '09/10/2017', editable: true, state: 'Aceptado'},
  {product: 'Producto3', amount: '22', price: '35400', producer: 'Productor1', createdAt: '09/10/2017', deliveryAt: '09/10/2017', editable: true, state: 'Entregado'},
  {product: 'Producto3', amount: '22', price: '35400', producer: 'Productor1', createdAt: '09/10/2017', deliveryAt: '09/10/2017', editable: true, state: 'Entregado'},
  {product: 'Producto3', amount: '22', price: '35400', producer: 'Productor1', createdAt: '09/10/2017', deliveryAt: '09/10/2017', editable: true, state: 'Entregado'},
  {product: 'Producto3', amount: '22', price: '35400', producer: 'Productor1', createdAt: '09/10/2017', deliveryAt: '09/10/2017', editable: true, state: 'Entregado'},
  {product: 'Producto3', amount: '22', price: '35400', producer: 'Productor1', createdAt: '09/10/2017', deliveryAt: '09/10/2017', editable: true, state: 'Entregado'},
  {product: 'Producto3', amount: '22', price: '35400', producer: 'Productor1', createdAt: '09/10/2017', deliveryAt: '09/10/2017', editable: true, state: 'Entregado'},
  {product: 'Producto3', amount: '22', price: '35400', producer: 'Productor1', createdAt: '09/10/2017', deliveryAt: '09/10/2017', editable: true, state: 'Entregado'},
  {product: 'Producto3', amount: '22', price: '35400', producer: 'Productor1', createdAt: '09/10/2017', deliveryAt: '09/10/2017', editable: true, state: 'Entregado'},


];

export default AdminScreen;