import React from 'react';
import { connect, useDispatch } from 'react-redux';
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
    <div>
      <h2 className="form-title">Listing Details</h2>
      {/* <div className="container"> */}
      <div className="form">
        <div className="col-lg-12 mb-4 view view-cascade overlay">
          <img
            class="card-img-top"
            src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img%20(4).jpg"
            alt=""
          />
          <a>
            <div class="mask rgba-white-slight"></div>
          </a>

          <div className="card-body card-body-cascade text-center">
            {HeaderItems.map((h, i) => (
              <th key={i}></th>
            ))}
            <h5>{listing.type}</h5>
            <h4 class="card-title">
              <strong>
                <a href="">{listing.title}</a>
              </strong>
            </h4>
            <p class="card-text">{listing.description}</p>
            <div class="card-footer">
              <span class="float-left">${listing.price}</span>
              <span class="float-right">
                <a
                  class=""
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Quick Look"
                >
                  <i class="fas fa-eye mr-3"></i>
                </a>
                <a
                  class=""
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Add to Wishlist"
                >
                  <i class="fas fa-heart"></i>
                </a>
              </span>
            </div>
          </div>
          {userMode ? (
            <div className="center">
              <textarea
                value={inquiryData.inquiryMsg}
                className="m-3 form-control"
                onChange={(e) => dispatch(setInquiryMsg(e.target.value))}
              />{' '}
              <br />
              <button
                className="btn float-middle"
                onClick={() =>
                  dispatch(postInquiry(listing.id, inquiryData.inquiryMsg))
                }
              >
                Send Inquiry
              </button>
            </div>
          ) : (
            <div>
              <button
                className="btn m-3"
                onClick={() => dispatch(fetchInquiries(true, listing.id))}
              >
                View Inquiries
              </button>
              <button
                className="btn float-right m-3"
                onClick={() => dispatch(deleteListing(listing.id, false))}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      {/* </div> */}
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
