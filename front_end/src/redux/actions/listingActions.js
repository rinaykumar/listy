const axios = require('axios');
// const formData = new FormData();
const { nanoid } = require('nanoid');

export const setDescription = (description) => ({
  type: 'DESCRIPTION_SET',
  description,
});

export const setType = (ListingType) => ({
  type: 'TYPE_SET',
  ListingType,
});

export const setPrice = (price) => ({
  type: 'PRICE_SET',
  price,
});

export const setTitle = (title) => ({
  type: 'TITLE_SET',
  title,
});

export const setImage = (image) => ({
  type: 'IMAGE_SET',
  image,
});

export const setShowListing = (showListing, listing) => ({
  type: 'SHOW_LISTING_SET',
  showListing,
  payload: listing,
});

export const deleteListing = (id, showListing) => {
  return (dispatch) => {
    dispatch(deleteListingRequest(id, showListing));
    axios
      .delete(`/api/deleteListing?id=${id}`)
      .then((response) => {
        const listings = response.data;
        console.log(listings);
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
    dispatch(postListingRequest(description, type, price, title, image));
    const formData = new FormData();
    formData.append('file', image);
    formData.append('id', id);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('price', price);
    formData.append('title', title);
    axios
      .post('/api/postListing', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        reportProgress: true,
        observe: 'events',
      })
      .then(() => {
        dispatch(fetchListings());
        console.log('inside');
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
      .get('/api/getListings')
      .then((response) => {
        const listings = response.data;
        dispatch(listingSuccess(listings));
      })
      .catch((error) => {
        dispatch(listingFailure(error.message));
      });
  };
};

export const fetchListingsRequest = () => {
  return {
    type: 'FETCH_LISTINGS_REQUEST',
  };
};

export const postListingRequest = () => {
  return {
    type: 'POST_LISTING_REQUEST',
  };
};

export const deleteListingRequest = () => {
  return {
    type: 'DELETE_LISTING_REQUEST',
  };
};

export const deleteListingSuccess = (listings, showListing) => {
  return {
    type: 'DELETE_LISTING_SUCCESS',
    payload: listings,
    showListing,
  };
};

export const listingSuccess = (listings) => {
  return {
    type: 'LISTING_SUCCESS',
    payload: listings,
  };
};

export const listingFailure = (error) => {
  return {
    type: 'LISTING_FAILURE',
    payload: error,
  };
};
