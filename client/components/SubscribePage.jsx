import React, { Component } from 'react';
import Header from './Header';
import SubscribeGrid from './SubscribeGrid'
import * as actions from '../actions';

class SubscribePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedSubCategories: []
		};
		this.toggleSubcategorySelect = this.toggleSubcategorySelect.bind(this);
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
				</div>
			</div>
		)
	}
}

SubscribePage.need = [() => actions.fetchCategory()];

export default SubscribePage;
