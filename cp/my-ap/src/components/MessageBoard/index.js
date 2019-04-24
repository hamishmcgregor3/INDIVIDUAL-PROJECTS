import { FirebaseContext } from '../Firebase';
import React, { Component } from 'react';
//import * as ROUTES from '../../constants/routes';
//import { Link, withRouter } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';
// import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
//import { defaultProps } from 'recompose';
//import ReactDOM from "react-dom";

const MessageBoard = () => (
  <div>
    <h1> Message Board: </h1>
    <FirebaseContext.Consumer>
      {firebase => <Display firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);

class MessageBoardBase extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      messages: [],
    };
  }

  componentDidMount() {                                           
    this.setState({ loading: true });
    this.props.firebase.db.ref('Messages').on('value', snapshot => {

      const listingObject = snapshot.val();

      if (listingObject) {
        const itemList = Object.keys(listingObject).map(key => ({
          ...listingObject[key],
          uid: key,
        }));
        this.setState({
          messages: itemList,
          loading: false 
        });
      } else {
        this.setState({ messages: null, loading: false });
      }

    });
  }

  componentWillUnmount() {
    this.props.firebase.db.ref('Messages').off();
  }

  render() {

    const { messages, loading } = this.state;

    return (

      <div>
        {loading && <div>Loading ...</div>}
        {messages ? (
          <ItemList messages={messages} state = {this.state}/>
        ) : (
            <div>There are no messages ...</div>
          )}
      </div>

    );

  }

}

const ItemList = (props) => {
  return (
    <ul>
      {props.messages.map(message => (
        <ItemDisplay key={message.sellerName} message={message} state = {props.state}/>
        ))}
    </ul>
  )
};

const ItemDisplay = (props) => {
  return (

  //NEED TO FIGURE OUT HOW TO CHANGE THE COLOUR OF THE SIGNOUT BUTTON AND ALSO TO CHANGE
  //THE COLOUR OF THE BOX IF AN ITEM HAS BEEN SOLD! 

  <li>
    <strong> Message For: {props.message.sellerName} </strong>
    <br></br>
    <br></br>
    {props.message.message}
    <br></br>
    <br></br>
    <strong>From:  </strong>
    {props.message.buyerName}
    <br></br>
    <br></br>
    <strong>Contact me at: </strong>
    {props.message.email} 
    <br></br>
    <br></br>
  </li>

)};

const Display = withFirebase(MessageBoardBase);

export default MessageBoard;
