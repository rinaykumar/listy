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
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import "./ListingCreationForm.css";
Modal.setAppElement("#root");

const ListingCreationForm = () => {
  const dispatch = useDispatch();
  const description = useSelector((state) => state.listingReducer.description);
  const type = useSelector((state) => state.listingReducer.type);
  const price = useSelector((state) => state.listingReducer.price);
  const title = useSelector((state) => state.listingReducer.title);
  const image = useSelector((state) => state.listingReducer.image);
  const ref = React.useRef();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  return (
    <div>
      {/* <div className="form-title">Creating A Listing</div> */}
      {/* <form className="form">
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            id="input-description"
            type="text"
            name="description"
            value={description}
            className="input-form"
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
            className="input-form"
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
            className="input-form"
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
            className="input-form"
            onChange={(e) => dispatch(setTitle(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Image">Upload an Image: </label>
          <input
            id="input-image"
            type="file"
            name="file"
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
      </form> */}

      <div className="container">
        <br />
        <br />
        <form className="form background">
          <h4 align="center">Create Listing</h4>
          <div className="form-group">
            <label htmlFor="title">Title: </label>
            <input
              id="input-title"
              type="text"
              name="title"
              value={title}
              className="input-form"
              onChange={(e) => dispatch(setTitle(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type: </label>
            <input
              id="input-type"
              type="text"
              name="type"
              value={type}
              className="input-form"
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
              className="input-form"
              onChange={(e) => dispatch(setPrice(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description: </label>
            <input
              id="input-description"
              type="text"
              name="description"
              value={description}
              className="input-form"
              onChange={(e) => dispatch(setDescription(e.target.value))}
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
          <div className="bottomdiv2" align="right">
            <button
              id="submit"
              className="btn btn-primary"
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
                  setModalIsOpen(true);
                }
              }}
            >
              Create Listing
            </button>
          </div>
        </form>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            content: {
              marginTop: 300,
              marginLeft: 500,
              width: 400,
              height: 150,
            },
          }}
        >
          <h4>Listing Created Successfully!</h4>
          <div className="deleteModal">
            <Button
              variant="success"
              onClick={() => {
                setModalIsOpen(false);
              }}
            >
              OK
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ListingCreationForm;
