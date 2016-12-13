import React from 'react';
import { Link } from 'react-router';

const Header = () => (
  <header>
    <div className="grid">
      <div className="col main-header">
        <div className="primary-nav col-wd-12">
          <div className="brand col-xs-2 col-sm-3 col-md-4 col-wd-2">
            <Link className="brand-name" to="/">
              <img src="/images/newsletter-logo.png" alt="Newsletter-logo" />
              <span>Newsletter<br />List</span>
            </Link>
          </div>
          <div className="right-content col-xs-10 col-sm-9 col-md-8 col-wd-10">
            <input type="search" name="Search" placeholder="Search" className="search col-xs-2 col-sm-3 col-md-4 col-wd-5" />
            <a href="#" className="submit-btn">Submit</a>
          </div>
        </div>
      </div>
    </div>  
  </header>
);

export default Header;