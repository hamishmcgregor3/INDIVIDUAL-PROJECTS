//import React from 'react';
import { FirebaseContext } from '../Firebase';
import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';

const AddListing = () => (
    <div>
        <h1>Add An Item To Sell:</h1>
        <FirebaseContext.Consumer>
            {firebase => <AddItemForm firebase={firebase} />}
            {/* firebase.db.ref('Listing').push( */}
            <AddItemForm />
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
        const { firstName, email, itemName, itemDescription, price, date } = this.state;
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
                    placeholder="price"
                />
                <input
                    name="date"
                    value={date}
                    onChange={this.onChange}
                    type="date"
                    placeholder="date"
                />

                <button type="submit">
                    Add Item
                </button>

                {error && <p>{error.message}</p>}

            </form>
        );
    }
}

// const SignUpForm = compose(
//     withRouter,
//     withFirebase,
//   )(SignUpFormBase);
  
//   export default SignUpPage;
  
//   export { SignUpForm, SignUpLink };

// -------- End of all the shit --------

export default AddListing;

