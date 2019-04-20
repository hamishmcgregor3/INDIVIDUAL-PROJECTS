// import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import Navigation from '../Navigation';

// const App = () => (

//   <div>
//     <h1> App </h1>

//   <Router>
//     <Navigation/>
//   </Router>

//   </div>

// );

// export default App;

// ----- MOST RECENT CHANGE -----

// //import React from 'react';
// import React, { Component } from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
// } from 'react-router-dom';

// import Navigation from '../Navigation';
// import LandingPage from '../Landing';
// import SignUpPage from '../SignUp';
// import SignInPage from '../SignIn';
// //import PasswordForgetPage from '../PasswordForget';
// import HomePage from '../Home';
// //import AccountPage from '../Account';
// //import AdminPage from '../Admin';

// import * as ROUTES from '../../constants/routes';
// import { withFirebase } from '../Firebase';
// import { AuthUserContext } from '../Session';

// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       authUser: null,
//     };
//   }

//   componentDidMount() {
//     this.listener = this.props.firebase.auth.onAuthStateChanged(
//       authUser => {
//         authUser
//           ? this.setState({ authUser })
//           : this.setState({ authUser: null });
//     });
//   }

//   componentWillUnmount() {
//     this.listener();
//   }

//   render() {
//     return (
//     <AuthUserContext.Provider value={this.state.authUser}>
//     <Router>
//       <div>
//         <Navigation authUser={this.state.authUser} />
//         {/* Potentially comment out Navigation line below? */}
//         <Navigation />
//         <Route exact path={ROUTES.LANDING} component={LandingPage} />
//         <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
//         <Route path={ROUTES.SIGN_IN} component={SignInPage} />
//         {/* <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} /> */}
//         <Route path={ROUTES.HOME} component={HomePage} />
//         {/* <Route path={ROUTES.ACCOUNT} component={AccountPage} />
//       <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
//       </div>
//     </Router>
//     </AuthUserContext.Provider>
//     );
//   }
// }

// //export default App;

// export default withFirebase(App);

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
// import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
// import AccountPage from '../Account';
// import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      {/* <Route
        exact
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      /> */}
      <Route exact path={ROUTES.HOME} component={HomePage} />
      {/* <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.ADMIN} component={AdminPage} /> */}
    </div>
  </Router>
);

export default withAuthentication(App);