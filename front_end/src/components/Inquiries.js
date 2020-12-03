import React from "react";
import { connect } from "react-redux";

const Inquiries = ({ inquiryData }) => {
  return (
    <div>
      <h3>Inquiries List</h3>
      {inquiryData.loading ? (
        <h4>Loading...</h4>
      ) : inquiryData.error ? (
        <h4>{inquiryData.error}</h4>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Listing Id</th>
              <th>Inquiry Message</th>
            </tr>
          </thead>
          <tbody>
            {inquiryData && inquiryData.inquiries ? (
              inquiryData.inquiries.map((inquiry) => (
                <tr key={inquiry.message} className="inquiry">
                  <td>{inquiry.id}</td>
                  <td>{inquiry.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No Inquiries available...</td>
              </tr>
            )}
          </tbody>
        </table>
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
