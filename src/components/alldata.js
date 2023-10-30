import React, { useContext } from 'react';
import { UserContext } from './context';
import './alldata.css';

/**
 * AllData component provides a visual representation of all the user data.
 * It fetches the users and the currently logged-in user from the context
 * and presents the combined data in a formatted JSON structure.
 */
function AllData() {
  // Fetch users and the currently logged-in user from the context.
  const { users, loggedInUser } = useContext(UserContext);

  // Prepare the combined data object.
  const data = {
    users: users,
    loggedInUser: loggedInUser
  };

  return (
    <div className="container alldata-container">
      <div className="alldata-content">
        <div className="card">
          <div className="card-header">All Data</div>
          <div className="card-body">
            {/* Display the data object in a structured manner. */}
            <div className="data-presentation">
              <pre><code>{JSON.stringify(data, null, 2)}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllData;
