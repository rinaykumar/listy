import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  postListing,
  setDescription,
  setType,
  setPrice,
  setTitle,
} from "../redux/actions/listingActions";

const ListingCreationForm = () => {
  const dispatch = useDispatch();
  const description = useSelector((state) => state.listingReducer.description);
  const type = useSelector((state) => state.listingReducer.type);
  const price = useSelector((state) => state.listingReducer.price);
  const title = useSelector((state) => state.listingReducer.title);
  return (
    <div>
      <h3 className="text-info">Creating A Listing</h3>
      <form>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            id="input-description"
            type="text"
            name="description"
            value={description}
            className="form-control"
            onChange={(e) => dispatch(setDescription(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type: </label>
          <input
            id="input-type"
            type="text"
            name="type"
            value={type}
            className="form-control"
            onChange={(e) => dispatch(setType(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price: </label>
          <input
            id="input-price"
            type="text"
            name="price"
            value={price}
            className="form-control"
            onChange={(e) => dispatch(setPrice(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            id="input-title"
            type="text"
            name="title"
            value={title}
            className="form-control"
            onChange={(e) => dispatch(setTitle(e.target.value))}
          />
        </div>
        <button
          id="submit"
          className="btn btn-dark"
          onClick={(e) => {
            e.preventDefault();
            if (
              description === "" ||
              type === "" ||
              price === "" ||
              title === ""
            ) {
              alert("Enter all fields..");
            } else {
              dispatch(postListing(description, type, price, title));
            }
          }}
        >
          Create Listing
        </button>
      </form>
    </div>
  );
};

export default ListingCreationForm;
