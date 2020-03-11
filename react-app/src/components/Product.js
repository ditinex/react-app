/*
* App Starting page
* Contents
*/

import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'assets/Theme.css';
import { FaCartPlus, FaCartArrowDown } from 'react-icons/fa';


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
  }


  render() {
    return (
      <div className="product">
        <div className="img-container">
          <img src={this.props.image} alt="" />
          <div className="button-wrapper">
            <div className="btn-container">
              <div className="btn-left" title="Add to Cart">
                <FaCartPlus size={35}/>
              </div>
              <div className="btn-right" title="Buy Now">
                <FaCartArrowDown size={35}/>
              </div>
            </div>
          </div>
        </div>
        <div className="product-name">{this.props.name}</div>
        <span className="strike">{(this.props.oldPrice!==0)?'$'+this.props.oldPrice:''}</span><span className="price">${this.props.price}</span>
      </div>
    );
  }

}


export { Product }
