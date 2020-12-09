import React from 'react';
import axios from 'axios';
import ViewListings from '../components/ViewListings';
import NavigationHeader from '../components/NavigationHeader';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

const User = () => {
  const [search, setSearch] = React.useState('');

  const handleSearch = () => {
    const searchItem = {
      search: search,
    };

    axios
      .post('/api/search', searchItem)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="container-fluid">
      <NavigationHeader />

      <div>
        <div className="container col-md-10">
          <InputGroup className="mb-3">
            <FormControl
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Listy"
              aria-label="Search Listy"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button onClick={handleSearch} variant="outline-primary">
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>

        <div className="container col-md-10">
          <br />
          <ViewListings userMode={true} />
        </div>
      </div>
    </div>
  );
};

export default User;
