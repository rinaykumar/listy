import React, { useEffect, useState } from 'react';
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

const ViewListings = ({ listingData, fetchListings, userMode }) => {
  useEffect(() => {
    fetchListings();
  }, [fetchListings]);
  const dispatch = useDispatch();

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
                                      <br></br>
                                      <h4 className="type">
                                        {listing.listingDescription}
                                      </h4>
                                      <br></br>
                                    </Row>
                                    <div className="bottomdiv">
                                      <InputGroup>
                                        <FormControl
                                          as="textarea"
                                          rows={3}
                                          aria-label=""
                                          size="sm"
                                          placeholder="Interested?"
                                        />
                                        <InputGroup.Prepend>
                                          <Button>Send Inquiry</Button>
                                        </InputGroup.Prepend>
                                      </InputGroup>
                                    </div>
                                  </Col>
                                </Row>
                              </Container>
                            </Card>
                            <Card border="none" bg="light"></Card>
                          </div>
                        </Accordion.Collapse>
                      </Accordion>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListings: () => dispatch(fetchListings(), fetchListings()),
    setShowListing: () => dispatch(setShowListing()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewListings);
