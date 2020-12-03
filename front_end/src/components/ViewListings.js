import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchListings, setShowListing } from "../redux/actions/listingActions";
import { setLoadInquiries } from "../redux/actions/inquiryActions";
import Listing from "./Listing";

const ViewListings = ({ listingData, fetchListings, userMode }) => {
  useEffect(() => {
    fetchListings();
  }, [fetchListings]);
  const dispatch = useDispatch();
  return (
    <div>
      <div
        style={{ paddingTop: 15, paddingLeft: 15, width: 800, minHeight: 370 }}
      >
        <h3 className="text-info">All Listings</h3>
        {listingData.loading ? (
          <h5>Loading...</h5>
        ) : listingData.error ? (
          <h5>{listingData.error}</h5>
        ) : (
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Listing ID</th>
                <th>Listing Title</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="table-secondary">
              {listingData &&
                listingData.listings &&
                listingData.listings.map((listing) => (
                  <tr key={listing.id} className="listing">
                    <td>{listing.id}</td>
                    <td>{listing.title}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => {
                          dispatch(setShowListing(true, listing));
                          dispatch(setLoadInquiries(false));
                        }}
                      >
                        Click for Details
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <div style={{ paddingTop: 15, paddingLeft: 15 }}>
        {listingData.showListing ? (
          <Listing userMode={userMode} listing={listingData.singleListing} />
        ) : (
          <p>Please select a listing for displaying the details</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    listingData: state.listingReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListings: () => dispatch(fetchListings(), fetchListings()),
    setShowListing: () => dispatch(setShowListing()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewListings);
