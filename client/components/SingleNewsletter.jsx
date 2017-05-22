import React, { Component } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions';

class SingleNewsletters extends Component {
	constructor(props){
		super(props);
		this.loadCategory = this.loadCategory.bind(this);
		this.loadSubCategory = this.loadSubCategory.bind(this);
	}
  loadCategory(e) {
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
		const { category } = this.props.newsletter;
		const { subcategory } = this.props.newsletter;
	return (
    <div className="handpicked-cards">
      <div className="col-xs-3 col-sm-4 col-md-6 card">
        <div className="col">
          <div className="newsletter-card">
            <h2 className="col-wd-12">{this.props.newsletter.name}</h2>
            <p className="col-wd-12">{this.props.newsletter.description}</p>
            <div className="metadata col-wd-12">
              <div className="tag-details col-wd-8">
                <Link to={`/${category.name}`} className="tag-1" onClick={this.loadCategory} data-name={category.name}>{category.name}</Link>
                <Link to={`/${category.name}/${subcategory.name}`} className="tag-2" onClick={this.loadSubCategory} data-category={category.name} data-subcategory={subcategory.name}>{subcategory.name}</Link>
              </div>
              <a target="_blank" href={this.props.newsletter.website} className="col-wd-4 get-it-btn">Get It</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
 }
}

SingleNewsletters.contextTypes = {
  router: React.PropTypes.object
}

export default SingleNewsletters;
