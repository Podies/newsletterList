import React, { Component } from 'react';
import Category from './Category';

class CategoryList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-body col-wd-12">
        <div className="col">
          <h1>Categories</h1>
          <ul className="categories col-wd-12">
            {
              this.props.categories.list.map((category, i) => <Category key={i} category={category} />)
            }
          </ul>
        </div>
      </div>
    )
  }
};

export default CategoryList;