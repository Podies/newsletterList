import React, { Component} from 'react';
import { Link } from 'react-router';

class Sidebar extends Component {
  render() {
    const { category } = this.props;
    let subCategoryList;
    if (category.subcategories.length !== 0) {
      subCategoryList = (
        <ul className="sub-category-list-up col-wd-12">
          {
            category.subcategories.map((subcategory, i) => 
              <li className="col-wd-12" key={i}>
                <Link to={`/${category.name}/${subcategory.name}`} className="col-wd-12">{subcategory.name}</Link>
              </li>
            )
          }
        </ul>
      )
    } else {
      subCategoryList = (<ul style={{display: 'none'}}></ul>)
    }
    return (
      <li className="category-name col-wd-12">
        <Link to={`/${category.name}`} className="category-link col-wd-12">{category.name}</Link>
        { subCategoryList }
      </li>
    )
  }
}

export default Sidebar;