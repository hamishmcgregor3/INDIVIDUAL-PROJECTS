import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import AddListing from '../AddListing';
import EditListing from '../EditListing';
import EditRemove from '../EditRemove';
//import ViewMyListings from '../ViewMyListings';
import HomePage from '../Home';
import MessageBoard from '../MessageBoard';
import SendMessage from '../SendMessage';
import AuthorsPage from '../AboutAuthors';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.EDIT_REMOVE} component={EditRemove} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.EDIT_LISTING} component={EditListing} />
      <Route exact path={ROUTES.ADD_LISTING} component={AddListing} />
      <Route exact path={ROUTES.SEND_MESSAGE} component={SendMessage} />
      <Route exact path={ROUTES.MESSAGE_BOARD} component={MessageBoard} />
      <Route exact path={ROUTES.AUTHORS} component={AuthorsPage} />

    </div>
  </Router>
);

export default withAuthentication(App);