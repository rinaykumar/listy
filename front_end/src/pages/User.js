import React from "react";
import ViewListings from "../components/ViewListings";
import NavigationHeader  from "../components/NavigationHeader";


const User = () => {
  return (
    <div>
      <NavigationHeader/>
      <h2>User Route</h2>
      <div>
        <div>
          <ViewListings userMode={true} />
        </div>
      </div>
    </div>
  );
};

export default User;
