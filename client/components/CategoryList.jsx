import React from 'react';
import Category from './Category';

const CategoryList = () => (
  <div className="main-body col-wd-12">
    <div className="col">
      <h1>Categories</h1>
      <ul className="categories col-wd-12">
        <Category />
      </ul>
    </div>
  </div>
);

export default CategoryList;