import React, { Component} from 'react';
import { Link } from 'react-router';
import * as actions from '../actions';

class Sidebar extends Component {

  constructor(props) {
    super(props);
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

  render() {
    const { category } = this.props;
    let subCategoryList;
    if (category.subcategories.length !== 0) {
      subCategoryList = (
        <ul className="sub-category-list-up col-wd-12">
          {
            category.subcategories.map((subcategory, i) =>
              <li className="col-wd-12" key={i}>
                <Link to={`/category/${category.name}/${subcategory.name}`} className="col-wd-12" onClick={this.loadSubCategory} data-category={category.name} data-subcategory={subcategory.name} >{subcategory.name}</Link>
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
        <Link to={`/${category.name}`} onClick={this.loadCategory} data-name={category.name} className="category-link col-wd-12">{category.name}</Link>
        { subCategoryList }
      </li>
    )
  }
}

Sidebar.contextTypes = {
  router: React.PropTypes.object
}

export default Sidebar;
