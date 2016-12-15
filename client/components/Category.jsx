import React, { Component } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions/index';

class Category extends Component {
  constructor(props){
    super(props);
    this.state = {
      subMenuClassName: 'sub-category-list-right',
    };
    this.changeSubmenuAlignment = this.changeSubmenuAlignment.bind(this);
  }

  changeSubmenuAlignment(e) {
    var ul = document.getElementById('submenu');

    if(e.screenX > e.view.innerWidth / 2){
      this.setState({ subMenuClassName: 'sub-category-list-left'});
    } else {
      this.setState({ subMenuClassName: 'sub-category-list-right'});
    }
  }

  render() {
    const { category } = this.props;
    let subCategoryList;
    if (category.subcategories.length !== 0) {
      subCategoryList = (
        <ul className={this.state.subMenuClassName} id="submenu">
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
      )
    } else {
      subCategoryList = (<ul style={{display: 'none'}}></ul>)
    }
    return(
      <li className="category-tab" onMouseOver={this.changeSubmenuAlignment}>
        <Link to={`/${category.name}`} className="category-name">
          <i className={`fa fa-${category.className}`} aria-hidden="true"></i>
          <p>{category.name}</p>
          <span className="triangle"></span>
        </Link>
        { subCategoryList }
      </li>
    )
  }
}

export default Category;
