import React, { Component } from 'react';
import Header from './Header';
import SubscribeGrid from './SubscribeGrid'
import * as actions from '../actions';
import * as ajaxCalls from '../actions/ajaxCalls';

class SubscribePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedSubCategories: []
		};
		this.toggleSubcategorySelect = this.toggleSubcategorySelect.bind(this);
		this.subscribeSubmit = this.subscribeSubmit.bind(this);
	}
	subscribeSubmit(e){
		e.preventDefault();
		const email = this.refs.subscribeEmail.value;
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var check = re.test(email);
		if (check) {
			ajaxCalls.ajaxSubscribe({ email, subcategories: this.state.selectedSubCategories }).then((res) => {
				this.context.router.push('/success');
			});
		} else {
			alert('Invalid Email Address');
		}
	}
	toggleSubcategorySelect(subcategoryId) {
		// toggle from current state
		const index = this.state.selectedSubCategories.indexOf(subcategoryId);
		if (index === -1) {
			this.state.selectedSubCategories.push(subcategoryId);
		} else {
			this.state.selectedSubCategories.splice(index, 1);
		}
		this.setState({ selectedSubCategories: this.state.selectedSubCategories });
	}

	render() {
		return(
			<div>
				<Header {...this.props}/>
				<div className="header-margin">
					<h2 className="heading-subscribe">Subscribe for updates on Newsletters.</h2>
					{
						this.props.categories.list.map((category, i) => (
							<SubscribeGrid
								key={i}
								category={category}
								toggleSubcategorySelect={this.toggleSubcategorySelect}
							/>
						))
					}
					<div className="email-subscription">
							<input className="form-control email-input" ref="subscribeEmail" placeholder="Enter your email" type="email" name="search" id="search" />
							<input className="form-control subscribe-btn" type="submit" onClick={this.subscribeSubmit} value="Subscribe" />
					</div>
				</div>
			</div>
		)
	}
}

SubscribePage.need = [() => actions.fetchCategory()];

SubscribePage.contextTypes = {
	router: React.PropTypes.object,
}

export default SubscribePage;
