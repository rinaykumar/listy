import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  postListing,
  setDescription,
  setType,
  setPrice,
  setTitle,
  setImage,
} from "../redux/actions/listingActions";

const ListingCreationForm = () => {
  const dispatch = useDispatch();
  const description = useSelector((state) => state.listingReducer.description);
  const type = useSelector((state) => state.listingReducer.type);
  const price = useSelector((state) => state.listingReducer.price);
  const title = useSelector((state) => state.listingReducer.title);
  const image = useSelector((state) => state.listingReducer.image);
  const ref = React.useRef();
  return (
    <div>
      <h3 className="text-info">Creating A Listing</h3>
      <form method="POST" encType="multipart/form-data">
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
        <div className="form-group">
          <label htmlFor="Image">Upload an Image: </label>
          <input
            id="input-image"
            type="file"
            name="imageUpload"
            accept=".jpg, .png, .jpeg"
            // value={image}
            className="form-control"
            ref={ref}
            onChange={(e) => dispatch(setImage(e.target.files[0]))}
            single="true"
          />
        </div>
        <button
          id="submit"
          className="btn btn-dark"
          onClick={(e) => {
            // console.log(image);
            ref.current.value = "";
            e.preventDefault();
            if (
              description === "" ||
              type === "" ||
              price === "" ||
              title === "" ||
              image === ""
            ) {
              alert("Enter all fields..");
            } else {
              dispatch(postListing(description, type, price, title, image));
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
