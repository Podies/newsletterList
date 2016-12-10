import React from 'react';

const Header = () => (
  <header>
    <div className="grid">
      <div className="primary-nav col-wd-12">
        <div className="brand col-wd-3">
          <a href="#" className="brand-name">Brand-Name</a>
        </div>
        <div className="right-content col-wd-9">
          <input type="search" name="Search" placeholder="Search" />
          <a href="#">Submit</a>
        </div>
      </div>
    </div>
  </header>
);

export default Header;