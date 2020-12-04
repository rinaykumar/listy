import React from "react";
import ViewListings from "../components/ViewListings";
import ListingCreationForm from "../components/ListingCreationForm";
import { connect } from "react-redux";
import Inquiries from "../components/Inquiries";
import NavigationHeader  from "../components/NavigationHeader";


const Admin = ({ listingData, inquiryData }) => {
  return (
    <div>
      <NavigationHeader/>
      <h2>Admin Route</h2>
      <div>
        <div>
          <ViewListings />
        </div>
        <div>
          <ListingCreationForm />
        </div>
      </div>
      <div>
        {listingData.showListing && inquiryData.loadInquiries && <Inquiries />}
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
