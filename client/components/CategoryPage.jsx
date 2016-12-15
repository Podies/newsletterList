import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import * as actions from '../actions';

class CategoryPage extends Component{
  constructor(props){
    super(props);
  }
  render(){
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
                <Sidebar key={i} category={category} />)
            }
            </ul>
          </div>
        </div>
      </div>
    ); 
  }
};

CategoryPage.need = [() => actions.fetchCategory(), () => actions.fetchNewsletters()];

export default CategoryPage;