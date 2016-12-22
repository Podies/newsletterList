import React, { Component } from 'react';
import Header from './Header';
import NewsletterGrid from './NewsletterGrid';

class SearchPage extends Component{
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div>
					<Header {...this.props}/>
					<div className="header-margin">
						<h2 className="heading-subscribe">Search Results</h2>
					</div>
					<div className="main-body col-wd-12" style={{marginTop: 0}}>
						<NewsletterGrid newsletters={this.props.newsletters} dispatch={this.props.dispatch} />
					</div>
			</div>
		)
	}
};

export default SearchPage;
