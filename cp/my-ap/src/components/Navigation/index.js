import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
     <h1> Navigation: </h1>
     <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.LANDING}>View Listings</Link>
    </li>
    <li>
      <Link to={ROUTES.ADD_LISTING}>Add Listing</Link>
    </li>
    <li>
      <Link to={ROUTES.EDIT_REMOVE}>Edit or Remove Listings</Link>
    </li>
    <li>
      <Link to={ROUTES.SEND_MESSAGE}>Send a Message</Link>
    </li>
    <li>
      <Link to={ROUTES.MESSAGE_BOARD}>View Message Board</Link>
    </li>
    <li>
      <Link to={ROUTES.AUTHORS}>About the Authors</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>View Listings</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={ROUTES.AUTHORS}>About the Authors</Link>
    </li>
  </ul>
);

export default Navigation;