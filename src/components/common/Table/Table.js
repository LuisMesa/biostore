import React, {Component} from 'react'
import {Table as MaterialTable, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';

import './Table.css';

class Table extends Component {
  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  renderRow(row) {
    const items = [];
    let index = 0;
    for (const prop in row) {
      if (row.hasOwnProperty(prop)) {
        items.push(this.props.renderItem(row[prop], prop, index));
        index++;
      }
    }
    return items;
  }

  render() {
    const tableConfig = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: true,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: false,
      deselectOnClickaway: false,
      showCheckboxes: true,
      height: '60vh',
    };
    return (
        <div className="Table">
          <div className="title">
            {this.props.children}
          </div>
          {this.props.expanded ?
              <MaterialTable
                  height={tableConfig.height}
                  fixedHeader={tableConfig.fixedHeader}
                  fixedFooter={tableConfig.fixedFooter}
                  selectable={tableConfig.selectable}
                  multiSelectable={tableConfig.multiSelectable}
                  onRowSelection={(selectedRows) => this.props.onRowSelection(selectedRows)}
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
                      <TableRow key={index} selected={this.props.selectedRows.indexOf(index) !== -1}>
                        {this.renderRow(row)}
                      </TableRow>
                  ))}
                </TableBody>
              </MaterialTable>
              :
              ''
          }
        </div>
    );
  }
}

// {this.props.data.map((row, index) => (
//     <TableRow key={index} selected={this.props.selectedRows.indexOf(index) !== -1}>
//       {row.items.map((item, index) => {
//         return this.props.renderItem(item, index)
//       })}
//     </TableRow>
// ))}
export default Table;