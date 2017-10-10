import React, {Component} from 'react'
import {Table as MaterialTable, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import Title from '../../common/Title/Title';

import './Table.css';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

const tableData = [
  {
    name: 'John Smith',
    status: 'Employed',
  },
  {
    name: 'Randal White',
    status: 'Unemployed',
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed',
  },
  {
    name: 'Steve Brown',
    status: 'Employed',
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed',
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed',
  },
  {
    name: 'Adam Moore',
    status: 'Employed',
  },
];

class Table extends Component {
  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  render() {
    const tableConfig = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: true,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: '60vh',
    };
    return (
        <div className="Table">
          <div className="title">
            {this.props.children}
          </div>
          <MaterialTable
              height={tableConfig.height}
              fixedHeader={tableConfig.fixedHeader}
              fixedFooter={tableConfig.fixedFooter}
              selectable={tableConfig.selectable}
              multiSelectable={tableConfig.multiSelectable}
          >
            <TableHeader
                displaySelectAll={tableConfig.showCheckboxes}
                adjustForCheckbox={tableConfig.showCheckboxes}
                enableSelectAll={tableConfig.enableSelectAll}
            >
              <TableRow>
                {this.props.columns.map((c, i) => <TableHeaderColumn tooltip={c.name} key={i}>{c.name}</TableHeaderColumn>)}
              </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={tableConfig.showCheckboxes}
                deselectOnClickaway={tableConfig.deselectOnClickaway}
                showRowHover={tableConfig.showRowHover}
                stripedRows={tableConfig.stripedRows}
            >
              {this.props.data.map((row, index) => (
                  <TableRow key={index}>
                    <TableRowColumn>{row.product}</TableRowColumn>
                    <TableRowColumn>{row.amount}</TableRowColumn>
                    <TableRowColumn>{row.price}</TableRowColumn>
                    <TableRowColumn>{row.producer}</TableRowColumn>
                    <TableRowColumn>{row.createdAt}</TableRowColumn>
                    <TableRowColumn>{row.deliveryAt}</TableRowColumn>
                    <TableRowColumn>{row.editable+''}</TableRowColumn>
                    <TableRowColumn>{row.state}</TableRowColumn>
                  </TableRow>
              ))}
            </TableBody>
            <TableFooter
                adjustForCheckbox={tableConfig.showCheckboxes}
            >
              <TableRow>
                <TableRowColumn>ID</TableRowColumn>
                <TableRowColumn>Name</TableRowColumn>
                <TableRowColumn>Status</TableRowColumn>
              </TableRow>
            </TableFooter>
          </MaterialTable>

        </div>
    );
  }
}

export default Table;