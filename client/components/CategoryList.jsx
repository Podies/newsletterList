import React, { Component } from 'react';
import Category from './Category';
import NewsletterGrid from './NewsletterGrid'

class CategoryList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-body col-wd-12">
        <div className="col">
          <ul className="categories col-wd-12">
            {
              this.props.categories.list
              	.map((category, i) =>
              		<Category key={i} category={category} dispatch={this.props.dispatch}  />)
            }
          </ul>
        </div>
        <NewsletterGrid newsletters={this.props.newsletters} dispatch={this.props.dispatch} />
      </div>
    )
  }
};

export default CategoryList;
