import React from "react";
import ViewListings from "../components/ViewListings";
import NavigationHeader  from "../components/NavigationHeader";
import { Button, InputGroup, FormControl } from 'react-bootstrap';


const User = () => {
  return (
    <div className="container-fluid">
      
      <NavigationHeader/>
      
      <div>
        <div className="container col-md-10">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search Listy"
            aria-label="Search Listy"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button variant="outline-primary">Search</Button>
          </InputGroup.Append>
        </InputGroup>
       
        </div>
        <div className="container col-md-10">
          <br/>
          <ViewListings userMode={true} />
        </div>
      </div>
    </div>
  );
};

export default User;
