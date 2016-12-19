import React from 'react';
import Header from './Header';
import CategoryList from './CategoryList';
import * as actions from '../actions';
import NewsletterGrid from './NewsletterGrid';

class Landing extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <img src="/images/newsletters-banner.png" alt="NewsletterList Banner" className="hero-banner col-sm-12 col-md-12 col-wd-12" />
        <Header {...this.props} />
        <CategoryList {...this.props} />
      </div>
    );
  }
}

Landing.need = [() => actions.fetchCategory(), () => actions.fetchHandPicked()];

export default Landing;