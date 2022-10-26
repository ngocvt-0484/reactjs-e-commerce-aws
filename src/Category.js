import React, { Component } from 'react';

class Category extends Component {
  render() {
    return(
      <div className="ais-hierarchical-menu--item">
        <div>
          <a href="#" className="facet-item" onClick={this.props.handleClickCategory}>
            <span className="facet-name"><i className="fa fa-angle-right" /> {this.props.name}</span>
          </a>
        </div>
      </div>
    )
  }
}
export default Category;
