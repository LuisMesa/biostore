import React, {Component} from 'react';
import MaterialDialog from 'material-ui/Dialog';

class Dialog extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
          <MaterialDialog
              title={this.props.title}
              actions={this.props.actions}
              modal={false}
              open={this.props.open}
              onRequestClose={this.props.handleClose}
          >
            {this.props.children}
          </MaterialDialog>
    );
  }
}

export default Dialog;