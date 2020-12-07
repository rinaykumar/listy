import React from 'react';
import ViewListings from '../components/ViewListings';
import NavigationHeader from '../components/NavigationHeader';

const User = () => {
  return (
    <div>
      <NavigationHeader />
      <nav class="navbar navbar-fixed-top navbar-dark bg-color">
        <div class="container">
          <ul class="nav navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#listing">
                Listings
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#viewInquiries">
                Inquiries
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div>
        <div className="container" id="listing">
          <ViewListings userMode={true} />
        </div>
      </div>
    </div>
  );
};

export default User;
