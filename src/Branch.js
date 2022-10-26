import React, { Component } from 'react';

class Branch extends Component {
  render() {
    return(
      <div className="ais-refinement-list--item">
        <div>
          <a href="javascript:void(0);" className="facet-item">
            <input type="checkbox" className="ais-refinement-list--checkbox" defaultValue="Insignia™" defaultChecked={this.props.checked}
              onChange={this.props.handleClickBranch} />
            {this.props.name}<span className="facet-count">(686)</span>
          </a>
        </div>
      </div>
    )
  }
}
export default Branch;
