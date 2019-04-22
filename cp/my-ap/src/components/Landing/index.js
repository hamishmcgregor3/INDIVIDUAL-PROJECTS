import { FirebaseContext } from '../Firebase';
import React, { Component } from 'react';
//import * as ROUTES from '../../constants/routes';
//import { Link, withRouter } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
//import ReactDOM from "react-dom";


const Landing = () => (
  <div>
    <h1> Current Listings: </h1>
    <FirebaseContext.Consumer>
      {firebase => <Display firebase={firebase} />}
    </FirebaseContext.Consumer>
    <Display />
  </div>
);

class DisplayBase extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      listings: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.db.ref('Listing').on('value', snapshot => {

      const listingObject = snapshot.val();

      if (listingObject) {
        const itemList = Object.keys(listingObject).map(key => ({
          ...listingObject[key],
          uid: key,
        }));
        this.setState({
          listings: itemList,
          loading: false 
        });
      } else {
        this.setState({ listings: null, loading: false });
      }

    });
  }

  componentWillUnmount() {
    this.props.firebase.db.ref('Listing').off();
  }

  render() {

    const { listings, loading } = this.state;

    return (

      <div>
        {loading && <div>Loading ...</div>}
        {listings ? (
          <ItemList listings={listings} />
        ) : (
            <div>There are no listings ...</div>
          )}
      </div>

    );

  }

}

const ItemList = ({ listings }) => (
  <ul>
    {listings.map(listing => (
      <ItemDisplay key={listing.itemName} listing={listing} />
    ))}
  </ul>
);

const ItemDisplay = ({ listing }) => (

  //NEED TO FIGURE OUT HOW TO CHANGE THE COLOUR OF THE SIGNOUT BUTTON AND ALSO TO CHANGE
  //THE COLOUR OF THE BOX IF AN ITEM HAS BEEN SOLD! 

  <li>
    <strong> Item For Sale: {listing.itemName} </strong>
    <br></br>
    <br></br>
    Item Description: {listing.itemDescription}
    <br></br>
    <br></br>
    Price: $ {listing.price}
    <br></br>
    <br></br>
    Date Listed: {listing.date} 
    <br></br>
    <br></br>
    <button type="submit"> Message Seller </button>
    <br></br>
    <br></br>
    <button type="submit"> Buy </button>
  </li>
);

const Display = withFirebase(DisplayBase);

// export default compose(
//   withEmailVerification,
//   withAuthorization(condition),
// )(HomePage);

export default Landing;

// const rootElement = document.getElementById("root");
// ReactDOM.render(<DisplayBase />, rootElement);
