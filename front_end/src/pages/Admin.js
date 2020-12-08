import React from 'react';
import ViewListings from '../components/ViewListings';
import ListingCreationForm from '../components/ListingCreationForm';
import { connect } from 'react-redux';
import Inquiries from '../components/Inquiries';
import NavigationHeader from '../components/NavigationHeader';
import './Admin.css';

const Admin = ({ listingData, inquiryData }) => {
  return (
    <div className="admin ">
      <NavigationHeader />
      <div class="container">
        <div className="form_row background">
          <ListingCreationForm />
        </div>
        <br />
        <br />
        <div>
          <div className="admin_row">
            <h4 align="center">Listings</h4>
            <br />
            <ViewListings userMode={false} />
          </div>
        </div>
        {/* <div>
          {listingData.showListing && inquiryData.loadInquiries && (
            <Inquiries />
          )}
        </div> */}
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
