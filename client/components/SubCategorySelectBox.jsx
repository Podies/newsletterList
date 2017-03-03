import React from 'react';

const SubCategorySelectBox = (props) => {

	const toggleCheckbox = () => {
		props.toggleCheckbox(props.subcategory._id);
	};

	return (
		<div className="single-subcategory" onClick={toggleCheckbox}>
			<input
				type="checkbox"
				name={props.subcategory.name}
				readOnly
				checked={props.selectedSubCategories.indexOf(props.subcategory._id) === -1 ? false : true}
			/>
			<label htmlFor={props.subcategory.name}>{props.subcategory.name}</label>
		</div>
	)
}

export default SubCategorySelectBox;
