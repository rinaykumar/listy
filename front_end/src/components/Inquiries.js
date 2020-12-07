import React from 'react';
import { connect } from 'react-redux';

const Inquiries = ({ inquiryData }) => {
  return (
    <div>
      <h2 className="form-title">Inquiries List</h2>
      {inquiryData.loading ? (
        <h4>Loading...</h4>
      ) : inquiryData.error ? (
        <h4>{inquiryData.error}</h4>
      ) : (
        <div class="row">
          {inquiryData && inquiryData.inquiries ? (
            inquiryData.inquiries.map((inquiry) => (
              <div key={inquiry.message} className="inquiry form">
                <div className="col-lg-12 mb-4">
                  <div className="card card-cascade card-ecommerce narrower">
                    <div className="card-body card-body-cascade text-center">
                      {/* <td>{inquiry.id}</td> */}
                      <p className="card-text">{inquiry.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card footer">
              <p>No Inquiries available...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    inquiryData: state.inquiryReducer,
  };
};

export default connect(mapStateToProps)(Inquiries);
