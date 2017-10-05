import React, {Component} from 'react';
import './Group.css';

class Group extends Component{
  render(){
    if(this.props.width)
      styles.root.width=this.props.width;

    return(
        <div className="Group" style={styles.root}>
          {this.props.children}
        </div>
    )
  }
}

let styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  // gridList: {
  //   width: 500,
  //   height: 450,
  //   overflowY: 'auto',
  // },
};

export default Group;