import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import * as actions from '../actions';
import { Link } from 'react-router';

class CategoryPage extends Component{
  constructor(props){
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
    return (
      <div>
        <Header {...this.props} />
        <input type="checkbox" id="sidebartoggler" />
        <div className="page-wrap">
          <label htmlFor="sidebartoggler" className="toggle">≡</label>
          <div className="col-xs-2 col-sm-2 col-md-2 col-wd-4 sidebar">
            <ul className="nav-bar col-wd-12">
            {
              this.props.categories.list.map((category, i) =>
                <Sidebar key={i} dispatch={this.props.dispatch} category={category} />)
            }
            </ul>
          </div>
          <div className="col-xs-10 col-sm-10 col-md-10 col-wd-8 category-details">
            <div className="col">
              <div className="col nav-details">
                <div className="primary-data">
                  <span>
                    <span>{this.props.params.category}</span>
                    <span>{this.props.params.subcategory ? '/' : null}</span>
                    <span>{this.props.params.subcategory}</span>
                  </span>
                  <Link to="/subscribe" className="follow-btn">Subscribe</Link>
                </div>
              </div>
              <div className="card-row col-xs-12 col-sm-12 col-md-12 col-wd-12 ">
                {
                  this.props.newsletters.list.map((item, i) => {
                    return (
                      <div key={i} className="col-xs-3 col-sm-4 col-md-6 card">
                        <div className="col">
                          <div className="newsletter-card">
                            <h2 className="col-wd-12">{item.name}</h2>
                            <p className="col-wd-12">{item.description}</p>
                            <div className="metadata col-wd-12">
                              <div className="tag-details col-wd-8">
                                <Link
                                	to={`/${item.category.name}/${item.subcategory.name}`}
                                	data-category={item.category.name}
                                	data-subcategory={item.subcategory.name}
                                	className="tag-1"
                                	onClick={this.loadSubCategory}
                                	>
                                	{item.subcategory.name}
                                </Link>
                                <Link
                                	to={`/${item.category.name}`}
                                	data-name={item.category.name}
                                	className="tag-2"
                                	onClick={this.loadCategory}
                                	>
                                	{item.category.name}
                                </Link>
                              </div>
                              <a target="_blank" href={item.website} className="col-wd-4 get-it-btn">Get It</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

CategoryPage.need = [() => actions.fetchCategory(), (params) => actions.fetchNewsletters(params)];

export default CategoryPage;
