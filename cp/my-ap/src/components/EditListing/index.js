import { FirebaseContext } from '../Firebase';
import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import firebase from 'firebase';

const EditListing = () => (
    <div>
        <h1>Edit Listing:</h1>
        <FirebaseContext.Consumer>
            {firebase => <EditListingForm firebase={firebase} />}
        </FirebaseContext.Consumer>
    </div>
);

const INITIAL_STATE = {
    firstName: '',
    email: '',
    itemName: '',
    itemDescription: '',
    price: '',
    sold: false,
    date: '',
    error: null,
    bgColor: 'white',
};

class EditListingFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
        console.log(this.props);
        //console.log(this.props.location.state.uid);
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => {
        this.setState({ loading: true });
        this.props.firebase.db.ref('Listing').on('value', snapshot => {

            const listingObject = snapshot.val();
            var uid;
            if (listingObject) {
                const itemList = Object.keys(listingObject).map(key => ({
                    ...listingObject[key],
                    uid: key,
                }));
                this.setState({
                    listings: itemList,
                    loading: false,
                });
            } else {
                this.setState({ listings: null, loading: false });
            }

        });

        const { firstName, email, itemName, itemDescription, price, sold, date, bgColor, } = this.state;
       
        var user = firebase.auth().currentUser;
        var userId;
        var listingID = this.props.location.state.uid; 

        if (user != null) {
            userId = user.uid;
        }
       
        // return this.props.firebase.db.ref(`users/${userId}/listings/${listingID}`).set({
        //     firstName, email, itemName, itemDescription, price, sold, date, bgColor,
        // })

        // return this.props.firebase.db.ref(`users/${userId}/listings/${listingID}`).set({
        //     firstName, email, itemName, itemDescription, price, sold, date, bgColor,
        // })

        return this.props.firebase.db.ref(`Listing/${listingID}`).update({
            firstName, email, itemName, itemDescription, price, sold, date, bgColor,
        })

    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {

        const {
            firstName,
            email,
            itemName,
            itemDescription,
            price,
            sold,
            date,
            error,
            bgColor,
        } = this.state;

        return (
            <form onSubmit={this.onSubmit}>

                <input
                    name="firstName"
                    value={firstName}
                    onChange={this.onChange}
                    type="text"
                    placeholder="First Name"
                />
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="itemName"
                    value={itemName}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Item Name"
                />
                <input
                    name="itemDescription"
                    value={itemDescription}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Item Description"
                />
                <input
                    name="price"
                    value={price}
                    onChange={this.onChange}
                    type="int"
                    placeholder="Price"
                />
                <input
                    name="date"
                    value={date}
                    onChange={this.onChange}
                    type="date"
                    placeholder="Date"
                />
                {/* <Link to={ROUTES.VIEW_MY_LISTINGS}> */}
                    <button type="submit">
                        Edit This Listing
                  </button>
                {/* </Link> */}

                {error && <p>{error.message}</p>}

            </form>
        );
    }
}

const EditListingForm = compose(
    withRouter,
    withFirebase,
)(EditListingFormBase);

export default EditListing;

export { EditListingForm };
