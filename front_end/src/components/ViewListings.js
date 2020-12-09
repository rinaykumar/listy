import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  postInquiry,
  setInquiryMsg,
  fetchInquiries,
} from '../redux/actions/inquiryActions';
import Modal from 'react-modal';
import { connect, useDispatch } from 'react-redux';
import { fetchListings, setShowListing } from '../redux/actions/listingActions';
import { setLoadInquiries } from '../redux/actions/inquiryActions';
import Listing from './Listing';
import './ViewListing.css';
import {
  Button,
  InputGroup,
  FormControl,
  Card,
  Container,
  Row,
  Col,
  Accordion,
  Collapse,
} from 'react-bootstrap';
import Inquiries from '../components/Inquiries';
import { deleteListing } from '../redux/actions/listingActions';
import { colors, TextareaAutosize } from '@material-ui/core';
Modal.setAppElement('#root');

const ViewListings = ({
  listingData,
  fetchListings,
  userMode,
  inquiryData,
}) => {
  useEffect(() => {
    fetchListings();
  }, [fetchListings]);
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const inquiryMsg = useSelector((state) => state.inquiryReducer.inquiryMsg);

  return (
    <div>
      {listingData.loading ? (
        <h5>Loading...</h5>
      ) : listingData.error ? (
        <h5>{listingData.error}</h5>
      ) : (
        <div className="">
          <div className="">
            <div class="">
              {listingData &&
                listingData.listings &&
                listingData.listings.map((listing) => (
                  <div key={listing.listingID} className="">
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={() => setModalIsOpen(false)}
                      style={{
                        content: {
                          marginTop: 300,
                          marginLeft: 500,
                          width: 250,
                          height: 150,
                        },
                      }}
                    >
                      <h4>Are you sure?</h4>
                      <div className="deleteModal">
                        <Button
                          variant="success"
                          onClick={() => {
                            dispatch(deleteListing(listing.listingID));
                            setModalIsOpen(false);
                          }}
                        >
                          Yes
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => setModalIsOpen(false)}
                        >
                          No
                        </Button>
                      </div>
                    </Modal>
                    <div class="col-lg-12 mb-4">
                      <Accordion defaultActiveKey="1">
                        <div>
                          <Card>
                            <Container padding="5px">
                              <Row>
                                <Col lg={2}>
                                  <img
                                    src={`data:image/jpeg;base64,${listing.listingImage100.image}`}
                                  />
                                </Col>
                                <Col lg={9}>
                                  <Row>
                                    <h5>{listing.listingTitle}</h5>
                                  </Row>
                                  <Row>
                                    <h6 className="type">
                                      {listing.listingType}
                                    </h6>
                                  </Row>
                                  <Row>
                                    <h4>${listing.listingPrice}</h4>
                                  </Row>
                                </Col>
                                <Row className="align-items-end">
                                  <Col lg={1}>
                                    <div className="align-items-end">
                                      <Accordion.Toggle
                                        as={Button}
                                        variant="primary"
                                        eventKey="0"
                                        onClick={() => {
                                          dispatch(
                                            setShowListing(true, listing)
                                          );
                                          dispatch(setLoadInquiries(false));
                                        }}
                                      >
                                        Details
                                      </Accordion.Toggle>
                                    </div>
                                  </Col>
                                </Row>
                              </Row>
                            </Container>
                          </Card>
                          <Card border="none" bg="light"></Card>
                        </div>

                        <Accordion.Collapse eventKey="0">
                          <div>
                            <Card>
                              <Container padding="5px">
                                <Row>
                                  <Col lg={7}>
                                    <img
                                      src={`data:image/jpeg;base64,${listing.listingImage500.image}`}
                                    />
                                  </Col>

                                  <Col lg={5}>
                                    <Row>
                                      <br />
                                    </Row>
                                    <Row>
                                      <h3>{listing.listingTitle}</h3>
                                    </Row>
                                    <Row>
                                      <h4 className="type">
                                        {listing.listingType}
                                      </h4>
                                    </Row>
                                    <Row>
                                      <h1>${listing.listingPrice}</h1>
                                    </Row>
                                    <Row>
                                      <p className="listingID">
                                        ID: {listing.listingID}
                                      </p>
                                    </Row>
                                    <Row>
                                      <br></br>
                                      <h4 className="type">
                                        {listing.listingDescription}
                                      </h4>
                                      <br></br>
                                    </Row>

                                    <div className="bottomdiv">
                                      {userMode ? (
                                        <div className="inquiryBox">
                                          <div>
                                            {listingData.showListing &&
                                              inquiryData.loadInquiries && (
                                                <Inquiries />
                                              )}
                                          </div>
                                          <div className="">
                                            <InputGroup className="mb-3">
                                              <FormControl
                                                placeholder="Message"
                                                aria-label=""
                                                aria-describedby="basic-addon2"
                                                value={inquiryMsg}
                                                onChange={(e) =>
                                                  dispatch(
                                                    setInquiryMsg(
                                                      e.target.value
                                                    )
                                                  )
                                                }
                                                onFocus={() => {
                                                  // console.log(listing.listingID);
                                                  dispatch(
                                                    fetchInquiries(
                                                      true,
                                                      listing.listingID
                                                    )
                                                  );
                                                }}
                                              />
                                              <InputGroup.Append>
                                                <Button
                                                  variant="primary"
                                                  onClick={() =>
                                                    dispatch(
                                                      postInquiry(
                                                        listing.listingID,
                                                        inquiryMsg
                                                      )
                                                    )
                                                  }
                                                >
                                                  Send
                                                </Button>
                                              </InputGroup.Append>
                                            </InputGroup>
                                          </div>
                                        </div>
                                      ) : (
                                        <>
                                          <Row>
                                            <Col sm={9}>
                                              <Accordion.Toggle
                                                as={Button}
                                                eventKey="0"
                                                onClick={() => {
                                                  // console.log(listing.listingID);
                                                  dispatch(
                                                    fetchInquiries(
                                                      true,
                                                      listing.listingID
                                                    )
                                                  );
                                                }}
                                              >
                                                View Inquiries
                                              </Accordion.Toggle>
                                            </Col>
                                            <Col>
                                              <Button
                                                variant="danger"
                                                onClick={() => {
                                                  // dispatch(
                                                  //   deleteListing(
                                                  //     listing.listingID,
                                                  //     false
                                                  //   )
                                                  // );
                                                  setModalIsOpen(true, listing);
                                                }}
                                              >
                                                Delete
                                              </Button>
                                            </Col>
                                          </Row>
                                        </>
                                      )}
                                    </div>
                                  </Col>
                                </Row>
                              </Container>
                            </Card>
                            <Card border="none" bg="light"></Card>
                          </div>
                        </Accordion.Collapse>
                        {!userMode && (
                          <Accordion.Collapse eventKey="0">
                            <div className="inquiryBox2">
                              <div>
                                {listingData.showListing &&
                                  inquiryData.loadInquiries && <Inquiries />}
                              </div>
                              <InputGroup className="mb-3">
                                <FormControl
                                  placeholder="Message"
                                  aria-label=""
                                  aria-describedby="basic-addon2"
                                  value={inquiryMsg}
                                  onChange={(e) =>
                                    dispatch(setInquiryMsg(e.target.value))
                                  }
                                />
                                <InputGroup.Append>
                                  <Button
                                    variant="primary"
                                    onClick={() =>
                                      dispatch(
                                        postInquiry(
                                          listing.listingID,
                                          inquiryMsg
                                        )
                                      )
                                    }
                                  >
                                    Send
                                  </Button>
                                </InputGroup.Append>
                              </InputGroup>
                            </div>
                          </Accordion.Collapse>
                        )}
                      </Accordion>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      <div style={{ paddingTop: 15, paddingLeft: 15 }}>
        {listingData.showListing ? (
          <Listing userMode={userMode} listing={listingData.singleListing} />
        ) : (
          <p></p>
        )}
      </div>

      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            marginTop: 300,
            marginLeft: 500,
            width: 250,
            height: 150,
          },
        }}
      >
        <h4>Are you sure?</h4>
        <div className="deleteModal">
          <Button
            variant="success"
            onClick={() => {
              dispatch(deleteListing(listing.listingID));
            }}
          >
            Yes
          </Button>
          <Button variant="danger" onClick={() => setModalIsOpen(false)}>
            No
          </Button>
        </div>
      </Modal> */}
    </div>

    // <div className="viewlisting">
    //   <h2 className="form-title">All Listings</h2>
    //   <div className="listing_row">
    //     {listingData.loading ? (
    //       <h5>Loading...</h5>
    //     ) : listingData.error ? (
    //       <h5>{listingData.error}</h5>
    //     ) : (
    //       <table className="table table-striped table-bordered shadow">
    //         <thead className="thead-dark">
    //           <tr>
    //             <th>Listing ID</th>
    //             <th>Listing Title</th>
    //             <th></th>
    //           </tr>
    //         </thead>
    //         <tbody className="table table-striped">
    //           {listingData &&
    //             listingData.listings &&
    //             listingData.listings.map((listing) => (
    //               <tr key={listing.id} className="listing">
    //                 <td>{listing.id}</td>
    //                 <td>{listing.title}</td>
    //                 <td>
    //                   <button
    //                     className="btn btn-dark"
    //                     onClick={() => {
    //                       dispatch(setShowListing(true, listing));
    //                       dispatch(setLoadInquiries(false));
    //                     }}
    //                   >
    //                     Click for Details
    //                   </button>
    //                 </td>
    //               </tr>
    //             ))}
    //         </tbody>
    //       </table>
    //     )}
    //   </div>
    //   <div>
    //     {listingData.showListing ? (
    //       <Listing userMode={userMode} listing={listingData.singleListing} />
    //     ) : (
    //       <p id="details">Please select a listing for displaying the details</p>
    //     )}
    //   </div>
    // </div>
  );
};

const mapStateToProps = (state) => {
  return {
    listingData: state.listingReducer,
    inquiryData: state.inquiryReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListings: () => dispatch(fetchListings(), fetchListings()),
    setShowListing: () => dispatch(setShowListing()),
    postInquiry: () => dispatch(postInquiry()),
    deleteListing: () => dispatch(deleteListing()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewListings);
