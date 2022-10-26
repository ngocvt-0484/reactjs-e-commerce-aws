import React, { Component } from 'react';

class Product extends Component {
  render() {
    return(
      <div className="ais-hits--item">
        <article className="hit">
          <div className="product-picture-wrapper">
            <div className="product-picture">
              <img src={this.props.imageurl}  />
              </div></div>
              <div className="product-desc-wrapper">
                <div className="product-name">{this.props.title}</div>
                <div className="product-type" />
                <div className="product-price">${this.props.price}</div>
                <div className="product-rating">
                  <span className="ais-star-rating--star" />
                  <span className="ais-star-rating--star" />
                  <span className="ais-star-rating--star" />
                  <span className="ais-star-rating--star" />
                  <span className="ais-star-rating--star__empty" />
                </div>
              </div>
          </article>
        </div>
    )
  }
}
export default Product;
