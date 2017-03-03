import React, { Component } from 'react';

//import components

import SingleNewsletter from './SingleNewsletter';

class NewsletterGrid extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {
          this.props.newsletters.list.map((newsletter, i) => <SingleNewsletter key={i} newsletter={newsletter} dispatch={this.props.dispatch}/>)
        }
      </div>
    )
  }
};

export default NewsletterGrid;
