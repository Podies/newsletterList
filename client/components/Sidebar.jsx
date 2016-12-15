import React from 'react';
import { Link } from 'react-router';

const Sidebar = (props) => (
  <li className="category-name col-wd-12">
    <Link to={`/${props.category.name}`} className="category-link col-wd-12">{props.category.name}</Link>
    <ul className="sub-category-list-up col-wd-12">
      {
        props.category.subcategories.map((subcategory, i) => 
          <li className="col-wd-12" key={i}>
            <Link to={`/${props.category.name}/${subcategory.name}`} className="col-wd-12">{subcategory.name}</Link>
          </li>
        )
      }
    </ul>
  </li>
);

export default Sidebar;