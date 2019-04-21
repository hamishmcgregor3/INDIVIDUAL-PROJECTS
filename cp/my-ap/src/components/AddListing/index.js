import React from 'react';
import { FirebaseContext } from '../Firebase';

const SomeComponent = () => (
    <FirebaseContext.Consumer>
        {firebase => {

            firebase.db.ref('Listing').push(
                {
                    name: 'Pheng Sengvuthy 004',
                    age: 24
                }
            ).then(() => {
                console.log('INSERTED !');
            }).catch((error) => {
                console.log(error);
            });

            return <div>I've access to Firebase and render something.</div>;
        }}
    </FirebaseContext.Consumer>
);

export default SomeComponent;
