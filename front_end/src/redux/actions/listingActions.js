const axios = require("axios");
const { nanoid } = require("nanoid");

export const setDescription = (description) => ({
  type: "DESCRIPTION_SET",
  description,
});

export const setType = (ListingType) => ({
  type: "TYPE_SET",
  ListingType,
});

export const setPrice = (price) => ({
  type: "PRICE_SET",
  price,
});

export const setTitle = (title) => ({
  type: "TITLE_SET",
  title,
});

export const setImage = (image) => ({
  type: "IMAGE_SET",
  image,
});

export const setShowListing = (showListing, listing) => ({
  type: "SHOW_LISTING_SET",
  showListing,
  payload: listing,
});

export const deleteListing = (id, showListing) => {
  return (dispatch) => {
    dispatch(deleteListingRequest(id, showListing));
    axios
      .get(`/api/deleteListing?id=${id}`)
      .then((response) => {
        const listings = response.data;
        dispatch(deleteListingSuccess(listings, showListing));
      })
      .catch((error) => {
        dispatch(listingFailure(error.message));
      });
  };
};

export const postListing = (description, type, price, title, image) => {
  return (dispatch) => {
    let id = nanoid(8);
    // console.log("ID: " + id);
    dispatch(postListingRequest(description, type, price, title, image));
    axios
      .post("/api/postListing", {
        id,
        description,
        type,
        price,
        title,
        image,
      })
      .then(() => {
        dispatch(fetchListings());
      })
      .catch((error) => {
        dispatch(listingFailure(error.message));
      });
  };
};

export const fetchListings = () => {
  return (dispatch) => {
    dispatch(fetchListingsRequest());
    axios
      .get("/api/getListings")
      .then((response) => {
        const listings = response.data;
        dispatch(listingSuccess(listings));
      })
      .catch((error) => {
        dispatch(listingFailure(error.message));
      });
    // const listings = [
    //   {
    //     description: "This is the first item",
    //     type: "type1",
    //     price: 124,
    //     title: "Itemno1",
    //     id: 11111111,
    //   },
    //   {
    //     description: "This is the second item",
    //     type: "type2",
    //     price: 145,
    //     title: "Itemno2",
    //     id: 11111112,
    //   },
    // ];
    // dispatch(listingSuccess(listings));
  };
};

export const fetchListingsRequest = () => {
  return {
    type: "FETCH_LISTINGS_REQUEST",
  };
};

export const postListingRequest = () => {
  return {
    type: "POST_LISTING_REQUEST",
  };
};

export const deleteListingRequest = () => {
  return {
    type: "DELETE_LISTING_REQUEST",
  };
};

export const deleteListingSuccess = (listings, showListing) => {
  return {
    type: "DELETE_LISTING_SUCCESS",
    payload: listings,
    showListing,
  };
};

export const listingSuccess = (listings) => {
  return {
    type: "LISTING_SUCCESS",
    payload: listings,
  };
};

export const listingFailure = (error) => {
  return {
    type: "LISTING_FAILURE",
    payload: error,
  };
};
