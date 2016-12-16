import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import * as actions from '../actions';

class CategoryPage extends Component{
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        <Header />
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
                  <span className="col-xs-2 col-sm-3">
                    <span>{this.props.params.category}</span>
                    <span>{this.props.params.subcategory ? '/' : null}</span>
                    <span>{this.props.params.subcategory}</span>
                  </span>
                  <a href="#" className="follow-btn">Follow</a>
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
                                <span className="tag-1">{item.subcategory.name}</span>
                                <span className="tag-2">{item.category.name}</span>
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