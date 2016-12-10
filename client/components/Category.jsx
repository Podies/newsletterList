import React from 'react';
import SubCategory from './SubCategory';

const Category = () => (
  <li className="category-tab">
    <a href="#" className="category-name">
      <i className="fa fa-cogs" aria-hidden="true"></i>
      <p>Technology</p>
      <span className="triangle"></span>
    </a>
    <SubCategory />
  </li>
);

export default Category;