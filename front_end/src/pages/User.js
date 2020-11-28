import React from "react";
import ViewListings from "../components/ViewListings";

const User = () => {
  return (
    <div>
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
