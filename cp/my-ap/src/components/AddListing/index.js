import { FirebaseContext } from '../Firebase';
import React, { Component } from 'react';
//import * as ROUTES from '../../constants/routes';
//import { Link, withRouter } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

const AddListing = () => (
    <div>
        <h1>Add An Item To Sell:</h1>
        <FirebaseContext.Consumer>
            {firebase => <AddItemForm firebase={firebase} />}
        </FirebaseContext.Consumer>
        <AddItemForm />
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
};

class AddItemFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => {

        const { firstName, email, itemName, itemDescription, price, sold, date } = this.state;

        //date = this.props.firebase.db.ServerValue.TIMESTAMP

        return this.props.firebase.db.ref('Listing').push({
            firstName, email, itemName, itemDescription, price, sold, date,
        });

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

                <button type="submit">
                    List Item For Sale
                </button>

                {error && <p>{error.message}</p>}

            </form>
        );
    }
}

const AddItemForm = compose(
    withRouter,
    withFirebase,
)(AddItemFormBase);

export default AddListing;

export { AddItemForm };