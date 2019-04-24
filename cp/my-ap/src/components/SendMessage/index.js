import { FirebaseContext } from '../Firebase';
import React, { Component } from 'react';
//import * as ROUTES from '../../constants/routes';
//import { Link, withRouter } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import firebase from 'firebase'; 

const SendMessage = () => (
    <div>
        <h1>Post to the Message Board:</h1>
        <FirebaseContext.Consumer>
            {firebase => <SendMessageForm firebase={firebase} />}
        </FirebaseContext.Consumer>
    </div>
);

const INITIAL_STATE = {
    sellerName: '',
    message: '',
    buyerName: '',
    email: '',
};

class SendMessageFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // onSubmit = event => {

    //     const { firstName, email, email, itemDescription, price, sold, date, bgColor } = this.state;

    //     //date = this.props.firebase.db.ServerValue.TIMESTAMP

    //     return this.props.firebase.db.ref('Listing').push({
    //         firstName, email, itemName, itemDescription, price, sold, date, bgColor,
    //     });

    // }

    onSubmit = event => {
       
        const { sellerName, message, buyerName, email } = this.state;

        var user = firebase.auth().currentUser;
        var userId;

        if (user != null) {
            userId = user.uid;
            console.log(userId);
        }
        
        return (
            this.props.firebase.db.ref('Messages').push({
                sellerName, message, buyerName, email,
            })
        )
    
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {

        const {
            sellerName,
            message, 
            buyerName, 
            email,
        } = this.state;

        return (
            <form onSubmit={this.onSubmit}>

                <input
                    name="sellerName"
                    value={sellerName}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Seller's Name"
                />
                <input
                    name="message"
                    value={message}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Message"
                />
                <input
                    name="buyerName"
                    value={buyerName}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Your Name"
                />
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />

                <button type="submit">
                    Post Message
                </button>

            </form>
        );
    }
}

const SendMessageForm = compose(
    withRouter,
    withFirebase,
)(SendMessageFormBase);

export default SendMessage;

export { SendMessageForm };