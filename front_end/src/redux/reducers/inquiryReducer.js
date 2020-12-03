const initState = {
  loading: false,
  inquiries: [],
  error: "",
  inquiryMsg: "Your Message Here...",
  loadInquiries: false,
};


const inquiryReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOAD_INQUIRIES_SET":
      return {
        ...state,
        loadInquiries: action.loadInquiries,
      };
    case "INQUIRY_MSG_SET":
      return {
        ...state,
        inquiryMsg: action.inquiryMsg,
      };
    case "FETCH_INQUIRIES_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_INQUIRIES_SUCCESS":
      return {
        ...state,
        loading: false,
        inquiries: action.payload,
        error: "",
        loadInquiries: action.loadInquiries,
      };
    case "FETCH_INQUIRIES_FAILURE":
      return {
        ...state,
        loading: false,
        inquiries: [],
        error: action.payload,
      };
    case "POST_INQUIRIES_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "POST_INQUIRIES_SUCCESS":
      return {
        ...state,
        loading: false,
        inquiries: action.payload,
        inquiryMsg: "Your Message Here...",
        error: "",
      };
    case "POST_INQUIRIES_FAILURE":
      return {
        ...state,
        loading: false,
        inquiries: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default inquiryReducer;
