import React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  postInquiry,
  setInquiryMsg,
  fetchInquiries,
} from "../redux/actions/inquiryActions";
import { deleteListing } from "../redux/actions/listingActions";

const Listing = ({ userMode, listing }) => {
  const HeaderItems = ["Image", "ID", "Title", "Type", "Description", "Price"];
  const inquiryMsg = useSelector((state) => state.inquiryReducer.inquiryMsg);
  const dispatch = useDispatch();
  return (
    <div>
      <h3>Listing Details</h3>
      <table>
        <thead>
          <tr>
            {HeaderItems.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className="listing">
            <td>
              <img
                src={`data:image/jpeg;base64,${listing.listingImage500.image}`}
              />
            </td>
            <td>{listing.listingID}</td>
            <td>{listing.listingTitle}</td>
            <td>{listing.listingType}</td>
            <td>{listing.listingDescription}</td>
            <td>{listing.listingPrice}</td>
            {userMode ? (
              <td>
                <textarea
                  placeholder="Post your Inquiry.."
                  value={inquiryMsg}
                  onChange={(e) => dispatch(setInquiryMsg(e.target.value))}
                />{" "}
                <br />
                <button
                  onClick={() =>
                    dispatch(postInquiry(listing.listingID, inquiryMsg))
                  }
                >
                  Send Inquiry
                </button>
              </td>
            ) : (
              <>
                <td>
                  <button
                    onClick={() =>
                      dispatch(deleteListing(listing.listingID, false))
                    }
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      // console.log(listing.listingID);
                      dispatch(fetchInquiries(true, listing.listingID));
                    }}
                  >
                    View Inquiries
                  </button>
                </td>
              </>
            )}
          </tr>
        </tbody>
      </table>
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
