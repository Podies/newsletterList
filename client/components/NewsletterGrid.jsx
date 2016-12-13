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
          this.props.list.map((newsletter, i) => <SingleNewsletter key={i} newsletter={newsletter}/>)
        }
      </div>
    )
  }
};

export default NewsletterGrid;