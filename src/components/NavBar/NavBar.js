import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
        <AppBar className="NavBar" title="BIOSTORE" iconClassNameRight="muidocs-icon-navigation-expand-more"
                onLeftIconButtonTouchTap={this.handleToggle}
                style={styles.navBar}
        >
          <Drawer
              docked={false}
              open={this.state.open}
              onRequestChange={(open) => this.setState({open})}
          >
            <MenuItem onTouchTap={() => console.log('Home')}>Home</MenuItem>
            <MenuItem onTouchTap={() => console.log('Productos')}>Productos</MenuItem>
          </Drawer>
        </AppBar>
    )
  }
}
const styles={
  navBar:{
    position:'fixed',
    top:'0px',
    left:'0px'
  }
};
export default NavBar;
