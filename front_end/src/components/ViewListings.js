import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchListings, setShowListing } from '../redux/actions/listingActions';
import { setLoadInquiries } from '../redux/actions/inquiryActions';
import Listing from './Listing';
import './ViewListing.css';

const ViewListings = ({ listingData, fetchListings, userMode }) => {
  useEffect(() => {
    fetchListings();
  }, [fetchListings]);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="form-title">Listings</div>
      {listingData.loading ? (
        <h5>Loading...</h5>
      ) : listingData.error ? (
        <h5>{listingData.error}</h5>
      ) : (
        <div className="container-fluid">
          <div className="container">
            <div class="row">
              {listingData &&
                listingData.listings &&
                listingData.listings.map((listing) => (
                  <div key={listing.id} className="form">
                    <div class="col-lg-12 mb-4">
                      <div class="card card-cascade card-ecommerce narrower text-center">
                        <div class="title">{listing.title}</div>
                        <p className="listing_id">{listing.id}</p>
                        <button
                          className="btn btn-color"
                          onClick={() => {
                            dispatch(setShowListing(true, listing));
                            dispatch(setLoadInquiries(false));
                          }}
                        >
                          Click for Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      <div>
        {listingData.showListing ? (
          <Listing userMode={userMode} listing={listingData.singleListing} />
        ) : (
          <p id="details">Please select a listing for displaying the details</p>
        )}
      </div>
    </div>

    // <div className="viewlisting">
    //   <h2 className="form-title">All Listings</h2>
    //   <div className="listing_row">
    //     {listingData.loading ? (
    //       <h5>Loading...</h5>
    //     ) : listingData.error ? (
    //       <h5>{listingData.error}</h5>
    //     ) : (
    //       <table className="table table-striped table-bordered shadow">
    //         <thead className="thead-dark">
    //           <tr>
    //             <th>Listing ID</th>
    //             <th>Listing Title</th>
    //             <th></th>
    //           </tr>
    //         </thead>
    //         <tbody className="table table-striped">
    //           {listingData &&
    //             listingData.listings &&
    //             listingData.listings.map((listing) => (
    //               <tr key={listing.id} className="listing">
    //                 <td>{listing.id}</td>
    //                 <td>{listing.title}</td>
    //                 <td>
    //                   <button
    //                     className="btn btn-dark"
    //                     onClick={() => {
    //                       dispatch(setShowListing(true, listing));
    //                       dispatch(setLoadInquiries(false));
    //                     }}
    //                   >
    //                     Click for Details
    //                   </button>
    //                 </td>
    //               </tr>
    //             ))}
    //         </tbody>
    //       </table>
    //     )}
    //   </div>
    //   <div>
    //     {listingData.showListing ? (
    //       <Listing userMode={userMode} listing={listingData.singleListing} />
    //     ) : (
    //       <p id="details">Please select a listing for displaying the details</p>
    //     )}
    //   </div>
    // </div>
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
