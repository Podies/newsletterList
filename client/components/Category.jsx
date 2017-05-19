import React, { Component } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions';

class Category extends Component {
  constructor(props){
    super(props);
    this.state = {
      subMenuClassName: 'sub-category-list-right',
    };
    this.changeSubmenuAlignment = this.changeSubmenuAlignment.bind(this);
    this.loadCategory = this.loadCategory.bind(this);
    this.loadSubCategory = this.loadSubCategory.bind(this);
  }

  loadCategory(e){
    e.preventDefault();
    const categoryName = e.currentTarget.getAttribute('data-name');
    this.props.dispatch(actions.fetchNewsletters({category: categoryName})).then(() => {
      this.context.router.push('/'+categoryName);
    });
  }

  loadSubCategory(e){
    e.preventDefault();
    const categoryName = e.currentTarget.getAttribute('data-category');
    const subCategoryName = e.currentTarget.getAttribute('data-subcategory');
    this.props.dispatch(actions.fetchNewsletters({category: categoryName, subcategory: subCategoryName})).then(() => {
      this.context.router.push('/'+categoryName+'/'+subCategoryName);
    });
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
    let subCategoryList, dropDownTriangle;
    if (category.subcategories.length !== 0) {
      subCategoryList = (
        <ul className={this.state.subMenuClassName} id="submenu">
           {
            category.subcategories.map((subcategory, i) => (
              <li key={i}>
                <Link to={`${category.name}/${subcategory.name}`} onClick={this.loadSubCategory} data-category={category.name} data-subcategory={subcategory.name} className="sub-category">
                  {subcategory.name}
                </Link>
              </li>
            ))
            }
        </ul>
      )
      dropDownTriangle = (<span className="triangle"></span>)
    } else {
      subCategoryList = (<ul style={{display: 'none'}}></ul>)
      dropDownTriangle = (<span style={{display: 'none'}}></span>)
    }
    return(
      <li className="category-tab" onMouseOver={this.changeSubmenuAlignment}>
        <Link to={`/${category.name}`} onClick={this.loadCategory} data-name={category.name} className="category-name">
          <i className={`fa ${category.className}`} aria-hidden="true"></i>
          <p>{category.name}</p>
          { dropDownTriangle }
        </Link>
        { subCategoryList }
      </li>
    )
  }
}

Category.contextTypes = {
  router: React.PropTypes.object,
}

export default Category;
