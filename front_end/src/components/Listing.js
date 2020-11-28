import React from "react";
import { connect, useDispatch } from "react-redux";
import {
  postInquiry,
  setInquiryMsg,
  fetchInquiries,
} from "../redux/actions/inquiryActions";
import { deleteListing } from "../redux/actions/listingActions";

const Listing = ({ inquiryData, userMode, listing }) => {
  const HeaderItems = ["Title", "Type", "Description", "Price"];
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
            <td>{listing.id}</td>
            <td>{listing.title}</td>
            <td>{listing.type}</td>
            <td>{listing.description}</td>
            <td>{listing.price}</td>
            {userMode ? (
              <td>
                <textarea
                  value={inquiryData.inquiryMsg}
                  onChange={(e) => dispatch(setInquiryMsg(e.target.value))}
                />{" "}
                <br />
                <button
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
                    onClick={() => dispatch(deleteListing(listing.id, false))}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => dispatch(fetchInquiries(true, listing.id))}
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

const mapStateToProps = (state) => {
  return {
    inquiryData: state.inquiryReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postInquiry: () => dispatch(postInquiry()),
    deleteListing: () => dispatch(deleteListing()),
    fetchInquiries: () => dispatch(fetchInquiries()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
