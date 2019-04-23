// import React from 'react';

// import { withFirebase } from '../Firebase';

// const SignOutButton = ({ firebase }) => (
//   <button type="button" onClick={firebase.doSignOut}>
//     Sign Out
//   </button>
// );

// export default withFirebase(SignOutButton);

import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <Link to={ROUTES.SIGN_IN}>
    <button type="button" onClick={firebase.doSignOut}>
      Sign out
     </button>
  </Link>
);

export default withFirebase(SignOutButton);