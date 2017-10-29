import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    maxWidth: '100%',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: '#fafafa',
  },
  gridTile: {
    width: '33.4vw',
    padding: '0px'
  }
};

class Photos extends Component {
  render() {
    return (
        <div style={styles.root}>
          <GridList style={styles.gridList} cols={2.2} cellHeight={220}>
            {this.props.producers.map((tile) => (
                <GridTile
                    key={tile.farmImg}
                    title={tile.name}
                    titleStyle={styles.titleStyle}
                    titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                >
                  <img src={tile.farmImg}/>
                </GridTile>
            ))}
          </GridList>
        </div>
    );
  }
}

export default Photos;