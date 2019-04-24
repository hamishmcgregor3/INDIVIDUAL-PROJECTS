import { FirebaseContext } from '../Firebase';
import React, { Component } from 'react';
//import * as ROUTES from '../../constants/routes';
//import { Link, withRouter } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';
// import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
//import { defaultProps } from 'recompose';
//import ReactDOM from "react-dom";

const Landing = () => (
  <div>
    <h1> Current Listings: </h1>
    <FirebaseContext.Consumer>
      {firebase => <Display firebase={firebase} />}
    </FirebaseContext.Consumer>
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
    //this.props.firebase.db.ref('Listing').orderByChild('price').on('value', snapshot => {
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

  testClick = (props) => {

    var listingID = props.target.value;

    return this.props.firebase.db.ref(`Listing/${listingID}`).update({
      bgColor : 'red', 
      sold : 'true'
    });
  
  }

  render() {

    const { listings, loading } = this.state;

    return (

      <div>
        {loading && <div>Loading ...</div>}
        {listings ? (
          <ItemList onClick={this.testClick} listings={listings} state = {this.state}/>
        ) : (
            <div>There are no listings ...</div>
          )}
      </div>

    );

  }

}

const ItemList = (props) => {
  return (
    <ul>
      {props.listings.map(listing => (
        <ItemDisplay testClick={props.onClick} key={listing.itemName} listing={listing} state = {props.state}/>
        ))}
    </ul>
  )
};

const ItemDisplay = (props) => {
  return (

  //NEED TO FIGURE OUT HOW TO CHANGE THE COLOUR OF THE SIGNOUT BUTTON AND ALSO TO CHANGE
  //THE COLOUR OF THE BOX IF AN ITEM HAS BEEN SOLD! 

  <li style={{backgroundColor:props.listing.bgColor}} >
    <strong> Item For Sale: {props.listing.itemName} </strong>
    <br></br>
    <br></br>
    Item Description: {props.listing.itemDescription}
    <br></br>
    <br></br>
    Price: $ {props.listing.price}
    <br></br>
    <br></br>
    Date Listed: {props.listing.date} 
    <br></br>
    <br></br>
    <button type="submit"> Message Seller </button>
    {/* <Link to={ROUTES.SEND_MESSAGES}>
      <button type="submit">
        Message Seller
     </button>
    </Link> */}
    <br></br>
    <br></br>
    <button onClick={props.testClick} value = {props.listing.uid} hidden={props.listing.sold} type="submit"> Buy </button>
  </li>

)};

const Display = withFirebase(DisplayBase);

export default Landing;
