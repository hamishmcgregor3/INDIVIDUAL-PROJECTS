import { FirebaseContext } from '../Firebase';
import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import firebase from 'firebase';


const ViewMyListings = () => (
    <div>
        <h1> My Listings: </h1>
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

        var user = firebase.auth().currentUser;
        var userId;
        if (user != null) {
            userId = user.uid;
        }

        this.props.firebase.db.ref(`users/${userId}/listings`).on('value', snapshot => {

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

    testClick = () => {
        this.setState({
            bgColor: 'red'
        })
    }

    render() {

        const { listings, loading } = this.state;

        return (

            <div>
                {loading && <div>Loading ...</div>}
                {listings ? (
                    <ItemList onClick={this.testClick} listings={listings} state={this.state} />
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
                <ItemDisplay testClick={props.onClick} key={listing.itemName} listing={listing} state={props.state} />
            ))}
        </ul>
    )
};

const ItemDisplay = (props) => (

    <li style={{ backgroundColor: props.state.bgColor }} >
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
        <Link to={{
            pathname: ROUTES.EDIT_LISTING,
            state: { uid: props.listing.uid }
        }}>
            <button type="submit">
                Edit This Listing
            </button>
        </Link>
        <br></br>
        <br></br>
        <button onClick={props.testClick} type="submit" > Delete This Listing </button>
    </li>

);

const Display = withFirebase(DisplayBase);

export default ViewMyListings;
