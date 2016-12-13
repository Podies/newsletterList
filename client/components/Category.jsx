import React from 'react';
import SubCategory from './SubCategory';
import * as actions from '../actions/index';

class Category extends React.Component{
  render() {
    return(
      <li className="category-tab">
        <a href="#" className="category-name">
          <i className={`fa fa-${this.props.category.className}`} aria-hidden="true"></i>
          <p>{this.props.category.name}</p>
          <span className="triangle"></span>
        </a>
        <SubCategory />
      </li>
    )
  }
};

export default Category;