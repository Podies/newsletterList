import React, { Component } from 'react';
import SubcategorySelectBox from './SubCategorySelectBox';

class SubscribeGrid extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedSubCategories: [],
		};
		this.toggleCheckbox = this.toggleCheckbox.bind(this);
		this.toggleAllSubCategories = this.toggleAllSubCategories.bind(this);
	}

	toggleCheckbox(subcategoryId){
		const index = this.state.selectedSubCategories.indexOf(subcategoryId);
		if (index === -1) {
			this.state.selectedSubCategories.push(subcategoryId);
		} else {
			this.state.selectedSubCategories.splice(index, 1);
		}

		this.setState({ selectedSubCategories: this.state.selectedSubCategories });
		this.props.toggleSubcategorySelect(subcategoryId);
	}

	toggleAllSubCategories() {
		//this.props.toggleSubcategorySelect;
		this.state.selectedSubCategories.forEach((subcategory, i) => {
			this.props.toggleSubcategorySelect(subcategory);
		});

		if(this.state.selectedSubCategories.length === this.props.category.subcategories.length) {
			this.setState({ selectedSubCategories: [] });
		} else {
			const allSubCategoryIds = this.props.category.subcategories.map((subcategory, i) => {
				this.props.toggleSubcategorySelect(subcategory._id);
				return subcategory._id;
			});
			this.setState({ selectedSubCategories: allSubCategoryIds });
		}
	}

	render() {
		const categoryCheck = this.state.selectedSubCategories.length === this.props.category.subcategories.length;
		return(
			<div className="col-md-12 subscribe-category">
				<div className="category-top" onClick={this.toggleAllSubCategories}>
					<input type="checkbox" name="category" readOnly checked={categoryCheck} />
					<label htmlFor="category">{this.props.category.name}</label>
				</div>
				<br />
				<div className="subcategory col-md-12">
					{
						this.props.category.subcategories.map((subcategory, i) => {
							return (
								<SubcategorySelectBox
									subcategory={subcategory}
									key={i}
									selectedSubCategories={this.state.selectedSubCategories}
									toggleCheckbox = {this.toggleCheckbox}
								/>
							)
						})
					}
				</div>
			</div>
		)
	}
}

export default SubscribeGrid;
