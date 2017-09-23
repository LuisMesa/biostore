import React, {Component} from 'react';
import './Title.css';

class Title extends Component {
  render() {
    return (
        <div className="Title">
          <h2 className="title">{this.props.title}</h2>
          <div className="niceBorder"/>
        </div>
    )
  }
}

export default Title;