import React, { Component } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions';

class Header extends Component {

  constructor(props) {
    super(props);
    this.loadHomePage = this.loadHomePage.bind(this);
    this.searchNewsletters = this.searchNewsletters.bind(this);
  }
  searchNewsletters(e) {
    if(e.keyCode == 13) {
      this.props.dispatch(actions.searchNewsletters(this.refs.searchText.value)).then(() => {
		  this.context.router.push('/search?text='+this.refs.searchText.value);
      });
    }
  }
  loadHomePage(e) {
    e.preventDefault();
    this.props.dispatch(actions.fetchHandPicked()).then(() => {
      this.context.router.push('/');
    });
  }

  render() {
    return (
      <header>
        <div className="grid">
          <div className="col main-header">
            <div className="primary-nav col-wd-12">
              <div className="brand col-xs-2 col-sm-3 col-md-4 col-wd-2">
                <Link className="brand-name" to="/" onClick={this.loadHomePage}>
                  <img src="/images/newsletter-logo.png" alt="Newsletter-logo" />
                  <span>Newsletter<br />List</span>
                </Link>
              </div>
              <div className="right-content col-xs-10 col-sm-9 col-md-8 col-wd-10">
                <input type="search" ref="searchText" name="Search"
                onKeyDown={this.searchNewsletters}
                placeholder="Search Newsletters"
                className="search col-xs-2 col-sm-3 col-md-4 col-wd-5" />
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

Header.contextTypes = {
  router: React.PropTypes.object,
}
export default Header;
