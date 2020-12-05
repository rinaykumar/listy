const axios = require('axios');

// /api/getInquiries?listingId=<listingId>
export const fetchInquiries = (loadInquiries, listingId) => {
  return (dispatch) => {
    dispatch(fetchInquiriesRequest(loadInquiries, listingId));
    // axios
    //   .get(`/api/getInquiries?listingId=${listingId}`)
    //   .then((response) => {
    //     const inquiries = response.data.inquiries;
    //     dispatch(fetchInquiriesSuccess(inquiries, loadInquiries));
    //   })
    //   .catch((error) => {
    //     dispatch(fetchInquiriesFailure(error.message));
    //   });
    const inquiries = [
      {
        message: 'first item inquiry',
        id: 11111111,
      },
      {
        message: 'second item inquiry',
        id: 11111112,
      },
    ];
    dispatch(fetchInquiriesSuccess(inquiries, loadInquiries));
  };
};

export const fetchInquiriesRequest = () => {
  return {
    type: 'FETCH_INQUIRIES_REQUEST',
  };
};
export const fetchInquiriesSuccess = (inquiries, loadInquiries) => {
  return {
    type: 'FETCH_INQUIRIES_SUCCESS',
    payload: inquiries,
    loadInquiries,
  };
};
export const fetchInquiriesFailure = (error) => {
  return {
    type: 'FETCH_INQUIRIES_FAILURE',
    payload: error,
  };
};

export const setInquiryMsg = (inquiryMsg) => {
  return {
    type: 'INQUIRY_MSG_SET',
    inquiryMsg,
  };
};

export const setLoadInquiries = (loadInquiries) => {
  return {
    type: 'LOAD_INQUIRIES_SET',
    loadInquiries,
  };
};

export const postInquiry = (id, message) => {
  return (dispatch) => {
    dispatch(postInquiryRequest(id, message));
    axios
      .post(`/api/makeInquiry?listingId=${id}`, { message: message })
      .then((response) => {
        const inquiries = response.data.inquiries;
        // console.log(inquiries);
        dispatch(postInquirySuccess(inquiries));
      })
      .catch((error) => {
        dispatch(postInquiryFailure(error.message));
      });
  };
};
export const postInquiryRequest = () => {
  return {
    type: 'POST_INQUIRIES_REQUEST',
  };
};
export const postInquirySuccess = (inquiries) => {
  return {
    type: 'POST_INQUIRIES_SUCCESS',
    payload: inquiries,
  };
};
export const postInquiryFailure = (error) => {
  return {
    type: 'POST_INQUIRIES_FAILURE',
    payload: error,
  };
};
