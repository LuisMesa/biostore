import React, {Component} from 'react'
import './Poster.css';

class Poster extends Component {
  render() {
    return (
        <div className="Poster">
          <div className="title">{this.props.title}</div>
          <div className="subtitle">{this.props.subtitle}</div>
          <img src={this.props.src} alt="Poster Providers"/>
        </div>
    );
  }
}

export default Poster;