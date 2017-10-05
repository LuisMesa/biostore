import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {GridList, GridTile} from 'material-ui/GridList';

import './CategoryRow.css'

class CategoryRow extends Component{
  render(){
    return(
        <div style={styles.root} className="CategoryRow">
          <GridList style={styles.gridList} cols={2.2} className="GridList">
            {this.props.categories.map((tile, index) => (
            <Link to={{pathname:"/products", state:{category:tile.title}}} key={index}>
                <GridTile
                    title={tile.title}
                    titleStyle={styles.titleStyle}
                    titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                    style={styles.gridTile}

                >
                  <img src={tile.src} alt={tile.title}/>
                </GridTile>
              </Link>
            ))}
          </GridList>
        </div>
    )
  }
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    maxWidth:'100%',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    // overflowX: 'auto',
  },
  titleStyle: {
    color: '#fafafa',
  },
  gridTile:{
    width:'33.4vw',
    padding: '0px'
  }
};

export default CategoryRow;
