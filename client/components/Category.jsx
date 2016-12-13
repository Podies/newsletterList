import React from 'react';
import { Link } from 'react-router';
import * as actions from '../actions/index';

class Category extends React.Component{
  render() {
    const { category } = this.props;
    return(
      <li className="category-tab">
        <Link to={`/${category.name}`} className="category-name">
          <i className={`fa fa-${category.className}`} aria-hidden="true"></i>
          <p>{category.name}</p>
          <span className="triangle"></span>      
        </Link>
          <ul className="sub-category-list-right">
            {
              category.subcategories.map((subcategory, i) => (
                <li key={i}>
                  <Link to={`${category.name}/${subcategory.name}`} className="sub-category">
                    {subcategory.name}
                  </Link>
                </li>
              ))
            }
          </ul>
      </li>
    )
  }
};

export default Category;