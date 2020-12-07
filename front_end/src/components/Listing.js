import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  postInquiry,
  setInquiryMsg,
  fetchInquiries,
} from '../redux/actions/inquiryActions';
import { deleteListing } from '../redux/actions/listingActions';

const Listing = ({ inquiryData, userMode, listing }) => {
  const HeaderItems = ['Id', 'Title', 'Type', 'Description', 'Price'];
  const dispatch = useDispatch();
  return (
    // <div>
    //   <h2 className="form-title">Listing Details</h2>
    //   <div className="container">
    //     <div class="row">
    //       <div className="listing">
    //         <div class="col-lg-12 mb-4">
    //           <div class="card text-center">
    //             {HeaderItems.map((h, i) => (
    //               <th key={i}>{h}:</th>
    //             ))}
    //             <th>{listing.id}</th>
    //             <th>{listing.title}</th>
    //             <th>{listing.type}</th>
    //             <th>{listing.description}</th>
    //             <th>{listing.price}</th>
    //             {userMode ? (
    //               <div>
    //                 <textarea
    //                   value={inquiryData.inquiryMsg}
    //                   onChange={(e) => dispatch(setInquiryMsg(e.target.value))}
    //                 />{' '}
    //                 <br />
    //                 <button
    //                   className="btn btn-primary"
    //                   onClick={() =>
    //                     dispatch(
    //                       postInquiry(listing.id, inquiryData.inquiryMsg)
    //                     )
    //                   }
    //                 >
    //                   Send Inquiry
    //                 </button>
    //               </div>
    //             ) : (
    //               <div>
    //                 <button
    //                   className="btn btn-primary"
    //                   onClick={() => dispatch(deleteListing(listing.id, false))}
    //                 >
    //                   Delete
    //                 </button>
    //                 <button
    //                   className="btn btn-primary"
    //                   onClick={() => dispatch(fetchInquiries(true, listing.id))}
    //                 >
    //                   View Inquiries
    //                 </button>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div>
      <h2 className="form-title">Listing Details</h2>
      <div className="container">
        <table className="table table-striped table-bordered shadow">
          <thead className="thead">
            <tr>
              {HeaderItems.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="listing">
            <td>{listing.listingID}</td>
            <td>{listing.listingTitle}</td>
            <td>{listing.listingType}</td>
            <td>{listing.listingDescription}</td>
            <td>{listing.listingPrice}</td>
              {userMode ? (
                <td>
                  <textarea
                    value={inquiryData.inquiryMsg}
                    onChange={(e) => dispatch(setInquiryMsg(e.target.value))}
                  />{' '}
                  <br />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      dispatch(postInquiry(listing.id, inquiryData.inquiryMsg))
                    }
                  >
                    Send Inquiry
                  </button>
                </td>
              ) : (
                <>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => dispatch(deleteListing(listing.id, false))}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      onClick={() => dispatch(fetchInquiries(true, listing.id))}
                    >
                      View Inquiries
                    </button>
                  </td>
                  <div id="exampleModalCenter" class="modal fade text-center">
                    <div
                      class="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div class="modal-content"></div>
                    </div>
                  </div>
                </>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postInquiry: () => dispatch(postInquiry()),
    deleteListing: () => dispatch(deleteListing()),
    fetchInquiries: () => dispatch(fetchInquiries()),
  };
};

export default connect(mapDispatchToProps)(Listing);
