import React from 'react';
import { connect } from 'react-redux';

const Inquiries = ({ inquiryData }) => {
  return (
    // <div
    //   class="modal fade"
    //   id="exampleModalCenter"
    //   tabindex="-1"
    //   role="dialog"
    //   aria-labelledby="exampleModalCenterTitle"
    //   aria-hidden="true"
    // >
    //   <div class="modal-dialog modal-dialog-centered" role="document">
    //     <div class="modal-content">
    //       {inquiryData.loading ? (
    //         <div class="modal-header">
    //           <h5 class="modal-title" id="exampleModalLongTitle">
    //             Inquiries List
    //           </h5>
    //           <button
    //             type="button"
    //             class="close"
    //             data-dismiss="modal"
    //             aria-label="Close"
    //           >
    //             <span aria-hidden="true">&times;</span>
    //           </button>
    //         </div>
    //       ) : inquiryData.error ? (
    //         <h4>{inquiryData.error}</h4>
    //       ) : (
    //         <div>
    //           <div class="modal-body">
    //             <table>
    //               <thead>
    //                 <tr>
    //                   <th>Listing Id</th>
    //                   <th>Inquiry Message</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {inquiryData && inquiryData.inquiries ? (
    //                   inquiryData.inquiries.map((inquiry) => (
    //                     <tr key={inquiry.message} className="inquiry">
    //                       <td>{inquiry.id}</td>
    //                       <td>{inquiry.message}</td>
    //                     </tr>
    //                   ))
    //                 ) : (
    //                   <tr>
    //                     <td>No Inquiries available...</td>
    //                   </tr>
    //                 )}
    //               </tbody>
    //             </table>
    //           </div>
    //           <div class="modal-footer">
    //             <button
    //               type="button"
    //               class="btn btn-secondary"
    //               data-dismiss="modal"
    //             >
    //               Close
    //             </button>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>

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
