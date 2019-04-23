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
    {/* <Display /> */}
  </div>
);

class DisplayBase extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      listings: [],
      //bgColor: 'white',  
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

  testClick = (props) => {

    //testClick = (listing) => {
    //search this.state.listings for the right one
    //when you find your listing, change it's bought property to true
   
    // newListings = listings.map((thisListing) => {
    //   if(thisListing.name == listing.name) {
    //     thisListing.bought = true;
    //   }
    // });
    // this.setState({listings: newListings});
   
    // this.setState({
    //   bgColor: 'red'
    // })

    //NEED TO UPDATE FIREBASE

    //this.props.listing.bgColor = 'red'; 

    //HARD CODING THE COLOR OF A LISTING BELOW

    return this.props.firebase.db.ref('Listing/LdAzfrlHylpLKuLGlEM').set({
      bgColor : 'red'
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

const ItemDisplay = (props) => (

  //NEED TO FIGURE OUT HOW TO CHANGE THE COLOUR OF THE SIGNOUT BUTTON AND ALSO TO CHANGE
  //THE COLOUR OF THE BOX IF AN ITEM HAS BEEN SOLD! 

  //<li style={{backgroundColor:props.state.bgColor}} >
  <li style={{backgroundColor:props.listing.bgColor}} >
    {/* <li style={props.listing.bought ? 'red' : 'white'}> */}
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
    Sold or Not: {props.listing.bgColor} 
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
    <button onClick={props.testClick} type="submit" > Buy </button>
  </li>

);

const Display = withFirebase(DisplayBase);

export default Landing;
