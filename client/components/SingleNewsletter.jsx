import React from 'react';

const SingleNewsletters = (props) => (
    <div className="handpicked-cards">
      <div className="col-xs-3 col-sm-4 col-md-6 card">
        <div className="col">
          <div className="newsletter-card">
            <h2 className="col-wd-12">{props.newsletter.name}</h2>
            <p className="col-wd-12">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className="metadata col-wd-12">
              <div className="tag-details col-wd-8">
                <span className="tag-1">{props.newsletter.category.name}</span>
                <span className="tag-2">{props.newsletter.subcategory.name}</span>
              </div>
              <a target="_blank" href={props.newsletter.website} className="col-wd-4 get-it-btn">Get It</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

export default SingleNewsletters;