import React, { Component } from 'react';
import Header from './Header';
import NewsletterGrid from './NewsletterGrid';

class SearchPage extends Component{
	constructor(props){
		super(props);
	}
	render() {
			let searchList;
	  	if(this.props.newsletters.length !== 0){
	  		searchList = (
					<div className="main-body col-wd-12" style={{marginTop: 0}}>
						<NewsletterGrid newsletters={this.props.newsletters} dispatch={this.props.dispatch} />
					</div>
	  		)
	  	}else {
	  		searchList = (
					<div className="main-body col-wd-12">
						<h2 className="heading-subscribe">No Result Found</h2>
					</div>
	  		)
	  	}
	return (
		<div>
			<Header {...this.props}/>
			<div className="header-margin">
				<h2 className="heading-subscribe">Search Results</h2>
			</div>
			{ searchList }
		</div>
	)}
};

export default SearchPage;
