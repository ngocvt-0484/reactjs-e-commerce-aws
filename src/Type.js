import React, { Component } from 'react';

class Type extends Component {
  render() {
    return(
      <div className="ais-refinement-list--item">
        <div>
          <a href="javascript:void(0);" className="facet-item">
            <input type="checkbox" className="ais-refinement-list--checkbox" defaultChecked={this.props.checked}
              onChange={this.props.handleClickType} defaultValue="Trend cases" />
              {this.props.name}<span className="facet-count">(421)</span>
          </a>
        </div>
      </div>
    )
  }
}
export default Type;
