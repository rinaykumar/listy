import React from 'react';
import ViewListings from '../components/ViewListings';
import ListingCreationForm from '../components/ListingCreationForm';
import { connect } from 'react-redux';
import Inquiries from '../components/Inquiries';
import NavigationHeader from '../components/NavigationHeader';
import './Admin.css';

const Admin = ({ listingData, inquiryData }) => {
  return (
    <div className="admin">
      <NavigationHeader />
      <nav class="navbar sticky-top navbar-dark bg-color">
        <div class="container">
          <ul class="nav navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#creationform">
                ListingCreationForm <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#listing">
                Listings
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#viewInquiries">
                Inquiries
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div class="container">
        <div className="form_row" id="creationform">
          <ListingCreationForm />
        </div>
        <div>
          <div className="admin_row container p-t-2">
            <div id="listing">
              <ViewListings />
            </div>
          </div>
        </div>
        <div id="viewInquiries">
          {listingData.showListing && inquiryData.loadInquiries && (
            <Inquiries />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    inquiryData: state.inquiryReducer,
    listingData: state.listingReducer,
  };
};

export default connect(mapStateToProps)(Admin);
