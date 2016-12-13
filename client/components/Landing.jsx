import React from 'react';
import Header from './Header';
import CategoryList from './CategoryList';
import * as actions from '../actions';

class Landing extends React.Component {
  render() {
    return (
      <div className="container">
        <img src="/images/newsletters-banner.png" alt="NewsletterList Banner" className="hero-banner col-sm-12 col-md-12 col-wd-12" />
        <Header />
        <CategoryList {...this.props} />
      </div>
    );
  }
}

Landing.need = [() => {
  return actions.fetchCategory();
}];
Landing.need = [() => {
  return actions.fetchSubCategory();
}];

export default Landing;