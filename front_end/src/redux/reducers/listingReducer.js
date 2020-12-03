const initState = {
  description: "",
  type: "",
  price: "",
  title: "",
  image: "",
  loading: false,
  listings: [],
  error: "",
  showListing: false,
  singleListing: [],
};


const listingReducer = (state = initState, action) => {
  switch (action.type) {
    case "DESCRIPTION_SET":
      return {
        ...state,
        description: action.description,
      };
    case "TYPE_SET":
      return {
        ...state,
        type: action.ListingType,
      };
    case "PRICE_SET":
      return {
        ...state,
        price: action.price,
      };
    case "TITLE_SET":
      return {
        ...state,
        title: action.title,
      };
    case "IMAGE_SET":
      return {
        ...state,
        image: action.image,
      };
    case "SHOW_LISTING_SET":
      return {
        ...state,
        showListing: action.showListing,
        singleListing: action.payload,
      };
    case "POST_LISTING_REQUEST":
      return {
        ...state,
        description: "",
        type: "",
        price: "",
        title: "",
        image: "",
        loading: true,
      };
    case "DELETE_LISTING_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_LISTINGS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_LISTING_SUCCESS":
      return {
        ...state,
        loading: false,
        listings: action.payload,
        error: "",
        showListing: action.showListing,
      };
    case "LISTING_SUCCESS":
      return {
        ...state,
        loading: false,
        listings: action.payload,
        error: "",
        showListing: action.showListing,
      };
    case "LISTING_FAILURE":
      return {
        ...state,
        loading: false,
        listings: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default listingReducer;
